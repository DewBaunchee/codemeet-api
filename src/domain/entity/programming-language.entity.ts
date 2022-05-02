import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class ProgrammingLanguage {

    @PrimaryColumn({
        type: "varchar",
        length: 20,
    })
    public key: string;

    @Column({
        type: "varchar",
        length: 40,
        nullable: false,
    })
    public label: string;

}