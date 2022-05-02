import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class GeoLocation {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: "decimal",
        nullable: false,
    })
    public longitude: number;

    @Column({
        type: "decimal",
        nullable: false,
    })
    public latitude: number;
}