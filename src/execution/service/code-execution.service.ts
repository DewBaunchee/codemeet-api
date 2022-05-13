import {Injectable} from "@nestjs/common";
import {ProgrammingLanguageKey} from "../../domain/entity/programming-language.entity";
import {Executor} from "../executor/executor";
import {JavascriptExecutor} from "../executor/javascript/javascript-executor";
import {WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from "socket.io";
import {v4 as UUID} from "uuid";
import {PythonExecutor} from "../executor/javascript/python-executor";

@Injectable()
@WebSocketGateway(Number(process.env.WEBSOCKET_PORT), {transports: ["websocket"]})
export class CodeExecutionService {

    @WebSocketServer()
    private server: Server;

    private readonly executors: Map<ProgrammingLanguageKey, Executor>;

    constructor() {
        this.executors = new Map<ProgrammingLanguageKey, Executor>(
            [new JavascriptExecutor(), new PythonExecutor()].map(executor => [executor.getExecutingLanguage(), executor])
        );
    }

    public execute(language: ProgrammingLanguageKey, code: string): string {
        const childProcess = this.executors.get(language).execute(code);
        const processNamespace: string = UUID();
        const processWebSocket = this.server.of(processNamespace);

        let closed: boolean = false;
        const close = () => {
            if (!closed) {
                childProcess.kill(9);
                processWebSocket.disconnectSockets(true);
                closed = true;
                console.log("Web Socket closed: " + processNamespace);
            }
        };

        processWebSocket.on("connection", (socket) => {

            socket.on("stdin", data => {
                childProcess.stdin.write(data);
            });

            socket.on("disconnect", () => {
                close();
            });
            console.log("New connected Web Socket: " + processNamespace);
        });

        childProcess.stdout.on("data", data => {
            processWebSocket.emit("stdout", data);
        });

        childProcess.stderr.on("data", data => {
            processWebSocket.emit("stderr", data);
        });

        processWebSocket.on("close", () => {
            close();
        });

        childProcess.on("close", code => {
            processWebSocket.emit("stdout", `\n  exit ${code}`);
            close();
        });

        return processNamespace;
    }
}
