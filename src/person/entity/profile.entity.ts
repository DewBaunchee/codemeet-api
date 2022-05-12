import {Language} from "../../domain/entity/language.entity";
import {Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Person} from "./person.entity";
import {ProgrammingLanguage} from "../../domain/entity/programming-language.entity";
import {Photo} from "./photo.entity";
import {SolvedObjective} from "../../objective/entity/solved-objective.entity";
import {Interest} from "../../domain/entity/interest.entity";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => Person, person => person.profile, {
        nullable: false,
        cascade: ["insert", "update"],
        eager: true,
    })
    @JoinColumn()
    public person: Person;

    @OneToOne(() => Photo, photo => photo.profile, {eager: true})
    @JoinColumn()
    public mainPhoto: Photo;

    @OneToMany(() => Photo, photo => photo.profile, {eager: true})
    public photos: Photo[];

    @ManyToMany(() => Interest, {eager: true})
    @JoinTable()
    public interests: Interest[];

    @ManyToMany(() => Language, {eager: true})
    @JoinTable()
    public languages: Language[];

    @ManyToMany(() => ProgrammingLanguage, {eager: true})
    @JoinTable()
    public programmingLanguages: ProgrammingLanguage[];

    @OneToMany(() => SolvedObjective, solvedObjective => solvedObjective.person.profile)
    public solvedObjectives: SolvedObjective[];

}