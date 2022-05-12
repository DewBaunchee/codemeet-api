import {Profile} from "../entity/profile.entity";
import {PhotoDto, photoToDto} from "./photo.dto";
import {LanguageDto, languageToDto} from "../../domain/dto/language.dto";
import {ProgrammingLanguageDto, programmingLanguageToDto} from "../../domain/dto/programming-language.dto";
import {InterestDto, interestToDto} from "../../domain/dto/interest.dto";

export interface ProfileDto {

    id: number;

    name: string;

    mainPhoto: PhotoDto;

    photos: PhotoDto[];

    interests: InterestDto[];

    languages: LanguageDto[];

    programmingLanguages: ProgrammingLanguageDto[];

}

export const profileToDto = (profile: Profile): ProfileDto => ({
    id: profile.id,
    name: profile.person.name,
    mainPhoto: profile.mainPhoto && photoToDto(profile.mainPhoto),
    photos: (profile.photos || []).map(photoToDto),
    interests: (profile.interests || []).map(interestToDto),
    languages: (profile.languages || []).map(languageToDto),
    programmingLanguages: (profile.programmingLanguages || []).map(programmingLanguageToDto),
});