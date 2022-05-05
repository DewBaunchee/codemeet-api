import {Interest, InterestCategoryType, InterestType} from "../entity/interest.entity";

export interface InterestDto {

    key: InterestType;

    category: InterestCategoryType;

}

export const interestToDto = (entity: Interest): InterestDto => ({
    key: entity.key,
    category: entity.category,
});