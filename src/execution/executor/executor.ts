import {ProgrammingLanguageKey} from "../../domain/entity/programming-language.entity";
import {ChildProcess} from "child_process";

export interface Executor {

    execute(code: string): ChildProcess;

    getExecutingLanguage(): ProgrammingLanguageKey;

}