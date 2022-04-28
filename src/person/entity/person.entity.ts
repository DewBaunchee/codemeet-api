import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "varchar", length: 40})
    public name: string;

    @Column({type: "varchar", length: 255, nullable: true})
    public email: string;

    @Column({name: "phone_number", type: "varchar", length: 15})
    public phoneNumber: string;

    @Column({type: "varchar", length: 60})
    public password: string;

}