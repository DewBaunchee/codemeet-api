import {Executor} from "../executor";
import {ChildProcess, spawn} from "child_process";
import {ProgrammingLanguageKey} from "../../../domain/entity/programming-language.entity";
import * as fs from "fs";
import * as tmp from "tmp";

export class PythonExecutor implements Executor {

    public execute(code: string): ChildProcess {
        const path = tmp.fileSync().name;
        const fd = fs.openSync(path, "w");
        fs.writeSync(fd, code);
        const compiling = spawn("python", [path]);

        compiling.on("close", () => {
            fs.unlinkSync(path);
        });

        setTimeout(() => {
            compiling.kill("SIGINT");
        }, 10 * 60 * 1000);

        return compiling;
    }

    public getExecutingLanguage(): ProgrammingLanguageKey {
        return ProgrammingLanguageKey.PYTHON;
    }

}