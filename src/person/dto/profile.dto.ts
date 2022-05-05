import {Profile} from "../entity/profile.entity";
import {PhotoDto, photoToDto} from "./photo.dto";
import {LanguageDto, languageToDto} from "../../domain/dto/language.dto";
import {ProgrammingLanguageDto, programmingLanguageToDto} from "../../domain/dto/programming-language.dto";

export interface ProfileDto {

    id: number;

    mainPhoto: PhotoDto;

    photos: PhotoDto[];

    languages: LanguageDto[];

    programmingLanguages: ProgrammingLanguageDto[];

}

export const profileToDto = (profile: Profile) => ({
    id: profile.id,
    mainPhoto: profile.mainPhoto && photoToDto(profile.mainPhoto),
    photos: profile.photos.map(photoToDto),
    languages: profile.languages.map(languageToDto),
    programmingLanguages: profile.programmingLanguages.map(programmingLanguageToDto),
});