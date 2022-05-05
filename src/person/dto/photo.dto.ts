import {Photo} from "../entity/photo.entity";

export interface PhotoDto {

    id: number;

    data: Buffer;

}

export const photoToDto = (entity: Photo): PhotoDto => ({
   id: entity.id,
   data: entity.data,
});