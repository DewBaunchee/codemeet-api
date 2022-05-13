import {Controller, Get, Post, Query, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../security/guard/jwt-auth.guard";
import {ObjectiveService} from "../service/objective.service";
import {objectiveToDto} from "../dto/objective.dto";

@Controller("objective")
@UseGuards(JwtAuthGuard)
export class ObjectiveController {

    constructor(private readonly objectiveService: ObjectiveService) {

    }

    @Get()
    public get(@Query("id") id: number) {
        return this.objectiveService.getById(id)
            .then(objective => objective && objectiveToDto(objective));
    }

    @Get("/list")
    public getObjectivesList(@Request() request) {
        return this.objectiveService.getAllObjectivesWithSolving(request.user.id);
    }

    @Get("/last-solving")
    public getLastSolvingId(@Request() request) {
        return this.objectiveService.getLastSolvingId(request.user.id);
    }

    @Post("/solved")
    public getSolvedById(@Request() request) {
        return this.objectiveService.getSolvedById(request.body.id, request.body.programmingLanguage);
    }

    @Post("/save")
    public save(@Request() request) {
        return this.objectiveService.save(
            request.user.id,
            request.body.objectiveId,
            request.body.programmingLanguage,
            request.body.code,
            request.body.solved
        ).then(() => undefined);
    }
}