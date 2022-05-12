import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Region} from "./region.entity";
import {GeoLocation} from "./geo-location.entity";

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: "varchar",
        length: 40,
        nullable: false,
    })
    public name: string;

    @ManyToOne(() => Region, {
        nullable: false,
    })
    @JoinColumn({
        referencedColumnName: "id",
    })
    public region: Region;

    @ManyToOne(() => GeoLocation, {
        nullable: false,
        cascade: ["insert", "update", "remove"],
    })
    @JoinColumn({
        referencedColumnName: "id",
    })
    public geoLocation: GeoLocation;

}