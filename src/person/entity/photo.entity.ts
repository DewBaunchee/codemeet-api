import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Profile} from "./profile.entity";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => Profile)
    @JoinColumn()
    public profile: Profile;

    @Column({type: "bytea", nullable: false})
    public data: Buffer;
}