import {Language} from "../../domain/entity/language.entity";
import {Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Person} from "./person.entity";
import {ProgrammingLanguage} from "../../domain/entity/programming-language.entity";
import {Photo} from "./photo.entity";
import {SolvedObjective} from "../../objective/entity/solved-objective.entity";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => Person, person => person.profile)
    @JoinColumn()
    public person: Person;

    @OneToOne(() => Photo, photo => photo.profile)
    @JoinColumn()
    public mainPhoto: Photo;

    @OneToMany(() => Photo, photo => photo.profile)
    public photos: Photo[];

    @ManyToMany(() => Language)
    @JoinTable()
    public languages: Language[];

    @ManyToMany(() => ProgrammingLanguage)
    @JoinTable()
    public programmingLanguages: ProgrammingLanguage[];

    @OneToMany(() => SolvedObjective, solvedObjective => solvedObjective.person.profile)
    public solvedObjectives: SolvedObjective[];

}