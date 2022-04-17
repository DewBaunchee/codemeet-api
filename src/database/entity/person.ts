import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    public id : number;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public phoneNumber: string;
}