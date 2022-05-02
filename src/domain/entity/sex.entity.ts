import {Entity, PrimaryColumn} from "typeorm";

export enum SexType {
    MALE = "male",
    FEMALE = "female",
    UNKNOWN = "unknown",
}

@Entity()
export class Sex {

    @PrimaryColumn({
        type: "enum",
        enum: SexType,
    })
    public key: SexType;

}
