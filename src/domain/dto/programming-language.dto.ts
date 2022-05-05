import {ProgrammingLanguage} from "../entity/programming-language.entity";

export interface ProgrammingLanguageDto {

    key: string;

    label: string;

}

export const programmingLanguageToDto = (entity: ProgrammingLanguage): ProgrammingLanguageDto => ({
    key: entity.key,
    label: entity.label,
});