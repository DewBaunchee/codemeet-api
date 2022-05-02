import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Country} from "./country.entity";

@Entity()
export class Language {

    @PrimaryColumn({
        type: "char",
        length: 5,
    })
    public key: string;

    @Column({
        type: "varchar",
        length: 40,
        nullable: false,
    })
    public label: string;

    @ManyToOne(() => Country)
    @JoinColumn({
        referencedColumnName: "isoCode",
    })
    public country?: Country;

}