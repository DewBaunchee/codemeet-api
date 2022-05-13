import {Module} from "@nestjs/common";
import {CodeExecutionService} from "./service/code-execution.service";
import {ExecutionController} from "./controller/execution.controller";

@Module({
    controllers: [ExecutionController],
    providers: [
        CodeExecutionService,
    ],
    exports: [CodeExecutionService],
})
export class ExecutionModule {

}