import {Controller, Get, UseGuards} from "@nestjs/common";
import {DomainService} from "../service/domain.service";
import {interestToDto} from "../dto/interest.dto";
import {languageToDto} from "../dto/language.dto";
import {programmingLanguageToDto} from "../dto/programming-language.dto";
import {sexToDto} from "../dto/sex.dto";
import {JwtAuthGuard} from "../../security/guard/jwt-auth.guard";

@Controller("domain")
@UseGuards(JwtAuthGuard)
export class DomainController {

    constructor(private readonly domainService: DomainService) {
    }

    @Get("interests")
    public getInterests() {
        return this.domainService.getInterests()
            .then(interests => interests.map(interestToDto));
    }

    @Get("languages")
    public getLanguages() {
        return this.domainService.getLanguages()
            .then(languages => languages.map(languageToDto));
    }

    @Get("programming-languages")
    public getProgrammingLanguages() {
        return this.domainService.getProgrammingLanguages()
            .then(programmingLanguages => programmingLanguages.map(programmingLanguageToDto));
    }

    @Get("sex-options")
    public getSexOptions() {
        return this.domainService.getSexOptions()
            .then(sexOptions => sexOptions.map(sexToDto));
    }

}