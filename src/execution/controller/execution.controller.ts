import {CodeExecutionService} from "../service/code-execution.service";
import {Controller, Post, Request} from "@nestjs/common";

@Controller("code")
export class ExecutionController {

    constructor(private readonly codeExecutionService: CodeExecutionService) {
    }

    @Post("execute")
    public handleExecution(@Request() request) {
        return this.codeExecutionService.execute(request.body.language, request.body.code);
    }
}