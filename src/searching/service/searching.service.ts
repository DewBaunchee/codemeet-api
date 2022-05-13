import {Injectable} from "@nestjs/common";
import {SearchingCoincidenceDto} from "../dto/searching-coincidence.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Person} from "../../person/entity/person.entity";
import {Repository} from "typeorm";
import {SolvedObjective} from "../../objective/entity/solved-objective.entity";
import {LastVisited} from "../entities/last-visited.entity";
import {isBlank} from "../../common/cm-lang";
import {profileToDto} from "../../person/dto/profile.dto";
import {solvedObjectiveToDto} from "../../objective/dto/solved-objective.dto";

@Injectable()
export class SearchingService {

    constructor(@InjectRepository(Person) private readonly personRepository: Repository<Person>,
                @InjectRepository(LastVisited) private readonly lastVisitedRepository: Repository<LastVisited>,
                @InjectRepository(SolvedObjective) private readonly solvedRepository: Repository<SolvedObjective>) {
    }

    public next(personId: number): Promise<SearchingCoincidenceDto> {
        return this.lastVisitedRepository.findOne({where: {visitor: personId}})
            .then(async lastVisited => {
                let [person, solvedObjective] = await this.find(lastVisited, personId);
                if (isBlank(person) || isBlank(solvedObjective)) return undefined;

                solvedObjective = await this.solvedRepository.findOne(solvedObjective.id);

                return Promise.resolve({
                    profile: profileToDto(await person.profile),
                    solvedObjective: solvedObjectiveToDto(solvedObjective),
                });
            });
    }

    private async find(lastVisited: LastVisited, visitorId: number): Promise<[Person, SolvedObjective]> {
        if (isBlank(lastVisited)) {
            lastVisited = new LastVisited();
            lastVisited.visitor = await this.personRepository.findOne(visitorId);
            lastVisited.visited = await this.getFirstPerson(visitorId);
            if (isBlank(lastVisited.visited)) return undefined;
        }
        const firstVisited = lastVisited.visited;

        let cycle = 0;
        let person: Person = await this.getNextPerson(lastVisited.visited.id, visitorId);
        if (isBlank(person)) {
            person = await this.getFirstPerson(visitorId);
            cycle++;
        }

        let solvedObjective: SolvedObjective;
        do {
            while (!await matching(lastVisited.visitor, person)) {
                person = await this.getNextPerson(lastVisited.visited.id, visitorId);
                if (cycle && person.id > firstVisited.id) return undefined;
                if (isBlank(person)) {
                    person = await this.getFirstPerson(visitorId);
                    cycle++;
                    if(cycle > 2) return [undefined, undefined];
                }
                lastVisited.visited = person;
            }

            if(isBlank(person)) return [undefined, undefined];

            solvedObjective = await this.solvedRepository.createQueryBuilder()
                    .where({person, solved: true})
                    .orderBy("RANDOM()")
                    .getOne();
        } while (isBlank(solvedObjective))
        this.lastVisitedRepository.save(lastVisited).then();
        return [person, solvedObjective];
    }

    private getNextPerson(id: number, visitorId: number): Promise<Person | undefined> {
        return this.personRepository.createQueryBuilder()
            .where("id > :id AND id <> :visitor", {id, visitor: visitorId})
            .orderBy("id", "ASC")
            .limit(1)
            .getOne();
    }

    private getFirstPerson(visitorId: number): Promise<Person | undefined> {
        return this.personRepository.createQueryBuilder()
            .where("id <> :visitor", {visitor: visitorId})
            .orderBy("id", "ASC")
            .limit(1)
            .getOne();
    }
}

const matching = async (first: Person, second: Person): Promise<boolean> => {
    const firstProfile = await first.profile;
    const secondProfile = await second.profile;
    return Promise.resolve(
        hasCommon(firstProfile.interests, secondProfile.interests, item => item.key) &&
        hasCommon(firstProfile.languages, secondProfile.languages, item => item.key) &&
        hasCommon(firstProfile.programmingLanguages, secondProfile.programmingLanguages, item => item.key)
    );
};

const hasCommon = <T, Comparing>(first: T[], second: T[], comparing: (item: T) => Comparing): boolean => {
    const searchingIn = second.map(comparing);
    return !!first.find(item => searchingIn.includes(comparing(item)));
};