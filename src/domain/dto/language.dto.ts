import {Language} from "../entity/language.entity";
import {CountryDto, countryToDto} from "./country.dto";

export interface LanguageDto {

    key: string;

    label: string;

    country?: CountryDto;

}

export const languageToDto = (entity: Language): LanguageDto => ({
    key: entity.key,
    label: entity.label,
    country: entity.country && countryToDto(entity.country),
});