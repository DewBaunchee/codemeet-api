import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Objective} from "../entity/objective.entity";
import {Repository} from "typeorm";
import {SolvedObjective} from "../entity/solved-objective.entity";
import {ObjectiveDto, objectiveToDto} from "../dto/objective.dto";
import {ProgrammingLanguage, ProgrammingLanguageKey} from "../../domain/entity/programming-language.entity";

@Injectable()
export class ObjectiveService {

    constructor(@InjectRepository(Objective) private readonly objectiveRepository: Repository<Objective>,
                @InjectRepository(SolvedObjective) private readonly solvedObjectiveRepository: Repository<SolvedObjective>) {
    }

    public getAllObjectivesWithSolving(personId: number): Promise<ObjectiveDto[]> {
        return this.solvedObjectiveRepository.find({where: {person: personId, solved: true}})
            .then(solved => solved.map(objective => objective.objective.id))
            .then(solvedIds => this.objectiveRepository.find()
                .then(objectives => objectives.map(objective => ({
                    ...objectiveToDto(objective),
                    solved: solvedIds.includes(objective.id),
                })))
            );
    }

    public getById(id: number): Promise<Objective> {
        return this.objectiveRepository.findOne({where: {id}});
    }

    public getLastSolvingId(personId: number): Promise<number> {
        return this.solvedObjectiveRepository.findOne({
            where: {person: personId, solved: false},
            order: {lastSaved: "DESC"}
        }).then(entity => entity?.objective?.id);
    }

    public getSolvedById(id: number, programmingLanguage: ProgrammingLanguageKey): Promise<SolvedObjective> {
        return this.solvedObjectiveRepository.findOne({where: {objective: id, programmingLanguage}});
    }

    public async save(personId: number, objectiveId: number, programmingLanguage: ProgrammingLanguageKey, code: string, solved: boolean) {
        const saved = await this.solvedObjectiveRepository.findOne({where: {person: personId, objective: objectiveId, programmingLanguage}});
        if(!saved) {
            const solving = new SolvedObjective();
            solving.person = personId as never;
            solving.objective = objectiveId as never;
            solving.programmingLanguage = Object.assign(new ProgrammingLanguage(), {key: programmingLanguage});
            solving.code = code;
            solving.solved = solved;
            return this.solvedObjectiveRepository.insert(solving).then(() => solving);
        }
        saved.code = code;
        saved.solved = solved;
        return this.solvedObjectiveRepository.save(saved);
    }
}