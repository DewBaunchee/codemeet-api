import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Profile} from "./profile.entity";

@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "varchar", length: 40})
    public name: string;

    @Column({type: "varchar", length: 255, nullable: true})
    public email: string;

    @Column({type: "varchar", length: 15})
    public phoneNumber: string;

    @Column({type: "varchar", length: 60})
    public password: string;

    @OneToOne(() => Profile, profile => profile.person, {
        nullable: false,
        cascade: ["insert", "update", "remove"]
    })
    profile: Profile;

}