import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Country {

    @PrimaryColumn({
        type: "char",
        length: 3,
    })
    public isoCode: string;

    @Column({
        type: "varchar",
        length: 40,
        nullable: false,
    })
    public name: string;

    @Column({
        type: "varchar",
        length: 100,
    })
    public officialName: string;

    @Column({
        type: "varchar",
        length: 5,
        nullable: false,
    })
    public phoneCode: string;

    @Column({
        type: "bytea"
    })
    public flag: Buffer;

}