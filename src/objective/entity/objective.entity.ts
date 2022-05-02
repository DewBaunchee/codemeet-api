import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Objective {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "varchar", length: 40})
    public title: string;

    @Column({type: "text"})
    public description: string;
}