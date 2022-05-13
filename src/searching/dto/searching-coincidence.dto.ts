import {ProfileDto} from "../../person/dto/profile.dto";
import {SolvedObjectiveDto} from "../../objective/dto/solved-objective.dto";

export interface SearchingCoincidenceDto {

    profile: ProfileDto;

    solvedObjective: SolvedObjectiveDto;

}
