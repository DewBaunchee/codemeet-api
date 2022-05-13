import {Entity, JoinColumn, ManyToOne} from "typeorm";
import {Person} from "../../person/entity/person.entity";

@Entity()
export class LastVisited {

    @ManyToOne(() => Person, {nullable: false, eager: true, primary: true})
    @JoinColumn()
    public visitor: Person;

    @ManyToOne(() => Person, {nullable: false, eager: true, primary: true})
    @JoinColumn()
    public visited: Person;

}