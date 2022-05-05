import {GeoLocation} from "../entity/geo-location.entity";

export interface GeoLocationDto {

    id: number;

    longitude: number;

    latitude: number;

}

export const geoLocationToDto = (entity: GeoLocation): GeoLocationDto => ({
    id: entity.id,
    longitude: entity.longitude,
    latitude: entity.latitude,
});