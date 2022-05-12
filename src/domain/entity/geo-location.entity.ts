import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class GeoLocation {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: "decimal",
        nullable: false,
    })
    public latitude: number;

    @Column({
        type: "decimal",
        nullable: false,
    })
    public longitude: number;

    constructor(latitude?: number, longitude?: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}