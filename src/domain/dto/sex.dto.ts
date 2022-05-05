import {Sex, SexType} from "../entity/sex.entity";

export interface SexDto {

    key: SexType;

}

export const sexToDto = (entity: Sex): SexDto => ({
    key: entity.key,
});