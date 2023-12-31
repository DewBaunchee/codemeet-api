import {City} from "../entity/city.entity";
import {RegionDto, regionToDto} from "./region.dto";
import {GeoLocationDto, geoLocationToDto} from "./geo-location.dto";

export interface CityDto {

    id: number;

    name: string;

    region: RegionDto;

    geoLocation: GeoLocationDto;

}

export const cityToDto = (entity: City): CityDto => ({
    id: entity.id,
    name: entity.name,
    region: regionToDto(entity.region),
    geoLocation: geoLocationToDto(entity.geoLocation),
});