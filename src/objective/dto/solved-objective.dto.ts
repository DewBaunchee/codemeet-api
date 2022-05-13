import {ObjectiveDto, objectiveToDto} from "./objective.dto";
import {ProgrammingLanguageDto, programmingLanguageToDto} from "../../domain/dto/programming-language.dto";
import {SolvedObjective} from "../entity/solved-objective.entity";

export interface SolvedObjectiveDto {

    objective: ObjectiveDto;

    programmingLanguage: ProgrammingLanguageDto;

    code: string;

    solved: boolean;

}

export const solvedObjectiveToDto = (entity: SolvedObjective): SolvedObjectiveDto => ({
    objective: objectiveToDto(entity.objective),
    programmingLanguage: programmingLanguageToDto(entity.programmingLanguage),
    code: entity.code,
    solved: entity.solved,
});