import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Profile} from "../entity/profile.entity";
import {Repository} from "typeorm";
import {from, Observable} from "rxjs";

@Injectable()
export class ProfileService {

    constructor(@InjectRepository(Profile) private readonly profileRepository: Repository<Profile>) {
    }

    public get(personId: number): Observable<Profile> {
        return from(this.profileRepository.createQueryBuilder()
            .select("profile")
            .from(Profile, "profile")
            .where("person.id = :id", {id: personId})
            .getOne());
    }

}