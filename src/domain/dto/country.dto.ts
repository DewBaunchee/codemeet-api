import {Country} from "../entity/country.entity";

export interface CountryDto {

    isoCode: string;

    name: string;

    officialName: string;

    phoneCode: string;

}

export const countryToDto = (entity: Country): CountryDto => ({
    isoCode: entity.isoCode,
    name: entity.name,
    officialName: entity.officialName,
    phoneCode: entity.phoneCode,
});