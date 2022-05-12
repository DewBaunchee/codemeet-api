import {Injectable} from "@nestjs/common";
import {Person} from "../entity/person.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class PersonService {

    constructor(@InjectRepository(Person) private readonly personRepository: Repository<Person>) {
    }

    public create(person: Person): Promise<Person> {
        return this.personRepository.insert(person).then(() => person);
    }

    public get(phoneNumber: string): Promise<Person> {
        return this.personRepository.findOne({phoneNumber});
    }
}
