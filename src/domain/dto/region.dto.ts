import {CountryDto, countryToDto} from "./country.dto";
import {Region} from "../entity/region.entity";

export interface RegionDto {

    id: number;

    name: string;

    country: CountryDto;

}

export const regionToDto = (entity: Region): RegionDto => ({
   id: entity.id,
   name: entity.name,
   country: countryToDto(entity.country),
});