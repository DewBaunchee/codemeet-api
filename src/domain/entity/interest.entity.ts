import {Column, Entity, PrimaryColumn} from "typeorm";

export enum InterestType {

    TENNIS = "Tennis",
    FOOTBALL = "Football",
    BASEBALL = "Baseball",

    RACING = "Racing",
    SKIING = "Skiing",

    VIDEO_GAMES = "Video games",
    FILMS = "Films",

    DESIGN = "Design",
    NEURAL_NETWORKS = "Neural networks",

}

export enum InterestCategoryType {

    SPORT = "Sport",
    EXTREME = "Extreme",
    TIME_SPENDING = "Time spending",
    IT = "IT",

}

@Entity()
export class Interest {

    @PrimaryColumn({
        type: "varchar",
        length: 40,
    })
    public key: InterestType;

    @Column({
        type: "varchar",
        length: 40,
        nullable: false,
    })
    public category: InterestCategoryType;

}