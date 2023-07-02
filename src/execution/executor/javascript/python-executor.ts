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
        const childProcess = spawn("python", [path]);

        childProcess.on("close", () => {
            fs.unlinkSync(path);
        });

        setTimeout(() => {
            childProcess.kill("SIGINT");
        }, 10 * 60 * 1000);

        return childProcess;
    }

    public getExecutingLanguage(): ProgrammingLanguageKey {
        return ProgrammingLanguageKey.PYTHON;
    }

}