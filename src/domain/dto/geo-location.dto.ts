import {GeoLocation} from "../entity/geo-location.entity";

export interface GeoLocationDto {

    longitude: number;

    latitude: number;

}

export const geoLocationToDto = (entity: GeoLocation): GeoLocationDto => ({
    longitude: entity.longitude,
    latitude: entity.latitude,
});