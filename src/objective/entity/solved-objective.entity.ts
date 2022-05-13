import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Person} from "../../person/entity/person.entity";
import {Objective} from "./objective.entity";
import {ProgrammingLanguage} from "../../domain/entity/programming-language.entity";

@Entity()
export class SolvedObjective {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Person, {nullable: false, eager: true})
    @JoinColumn()
    public person: Person;

    @ManyToOne(() => Objective, {nullable: false, eager: true})
    @JoinColumn()
    public objective: Objective;

    @ManyToOne(() => ProgrammingLanguage, {nullable: false, eager: true})
    @JoinColumn()
    public programmingLanguage: ProgrammingLanguage;

    @Column({type: "text", nullable: false})
    public code: string;

    @Column({type: "boolean", nullable: false, default: false})
    public solved: boolean;

    @UpdateDateColumn()
    public lastSaved: Date;

}