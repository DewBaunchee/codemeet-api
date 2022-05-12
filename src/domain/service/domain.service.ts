import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Interest} from "../entity/interest.entity";
import {Repository} from "typeorm";
import {Language} from "../entity/language.entity";
import {ProgrammingLanguage} from "../entity/programming-language.entity";
import {Sex} from "../entity/sex.entity";

@Injectable()
export class DomainService {

    constructor(@InjectRepository(Interest) private readonly interestRepository: Repository<Interest>,
                @InjectRepository(Language) private readonly languageRepository: Repository<Language>,
                @InjectRepository(ProgrammingLanguage) private readonly programmingLanguageRepository: Repository<ProgrammingLanguage>,
                @InjectRepository(Sex) private readonly sexRepository: Repository<Sex>) {
    }

    public getInterests(): Promise<Interest[]> {
        return this.interestRepository.find();
    }

    public getLanguages(): Promise<Language[]> {
        return this.languageRepository.find();
    }

    public getProgrammingLanguages(): Promise<ProgrammingLanguage[]> {
        return this.programmingLanguageRepository.find();
    }

    public getSexOptions(): Promise<Sex[]> {
        return this.sexRepository.find();
    }
}