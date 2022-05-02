import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Country} from "./country.entity";

@Entity()
export class Region {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
    })
    public name: string;

    @ManyToOne(() => Country)
    @JoinColumn({
        referencedColumnName: "isoCode",
    })
    public country: Country;
}