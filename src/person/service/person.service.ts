import {Injectable} from '@nestjs/common';
import {from, map, Observable} from "rxjs";
import {Person} from "../entity/person.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class PersonService {

    constructor(@InjectRepository(Person) private readonly personRepository: Repository<Person>) {
    }

    public create(person: Person): Observable<Person> {
        return from(this.personRepository.insert(person))
            .pipe(map(() => person));
    }

    public get(phoneNumber: string): Observable<Person> {
        return from(this.personRepository.findOne({phoneNumber}));
    }
}
