import {Column, Entity, PrimaryColumn} from "typeorm";

export enum ProgrammingLanguageKey {

    JAVA = "java",
    CPP = "cpp",
    CSHARP = "csharp",
    C = "c",
    KOTLIN = "kotlin",
    JAVASCRIPT = "javascript",
    PYTHON = "python",
    HTML = "html",
    TYPESCRIPT = "typescript",

}

@Entity()
export class ProgrammingLanguage {

    @PrimaryColumn({
        type: "varchar",
        length: 20,
    })
    public key: ProgrammingLanguageKey;

    @Column({
        type: "varchar",
        length: 40,
        nullable: false,
    })
    public label: string;

}