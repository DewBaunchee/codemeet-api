import {Column, Entity, PrimaryColumn} from "typeorm";

export enum InterestType {

}

export enum InterestCategoryType {

}

@Entity()
export class Interest {

    @PrimaryColumn({
        type:"enum",
        enum: InterestType,
    })
    public key: InterestType;

    @Column({
        type: "enum",
        enum: InterestCategoryType,
        nullable: false,
    })
    public category: InterestCategoryType;

}