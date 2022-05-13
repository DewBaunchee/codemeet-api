import {Objective} from "../entity/objective.entity";

export interface ObjectiveDto {

    id: number;

    title: string;

    description: string;

    solved?: boolean;

}

export const objectiveToDto = (entity: Objective): ObjectiveDto => ({
    id: entity.id,
    title: entity.title,
    description: entity.description,
});