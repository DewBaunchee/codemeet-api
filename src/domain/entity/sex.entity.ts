import {Entity, PrimaryColumn} from "typeorm";

export enum SexType {
    MALE = "male",
    FEMALE = "female",
    UNKNOWN = "unknown",
}

@Entity()
export class Sex {

    @PrimaryColumn({
        type: "varchar",
        length: 40,
    })
    public key: SexType;

}
