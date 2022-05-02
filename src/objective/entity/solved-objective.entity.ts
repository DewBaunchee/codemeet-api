import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Person} from "../../person/entity/person.entity";
import {Objective} from "./objective.entity";
import {ProgrammingLanguage} from "../../domain/entity/programming-language.entity";

@Entity()
export class SolvedObjective {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Person)
    @JoinColumn()
    public person: Person;

    @ManyToOne(() => Objective)
    @JoinColumn()
    public objective: Objective;

    @ManyToOne(() => ProgrammingLanguage)
    @JoinColumn()
    public programmingLanguage: ProgrammingLanguage;

    @Column({type: "text", nullable: false})
    public solving: string;

}