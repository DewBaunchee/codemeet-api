import {Controller, Get, Request, UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from "src/security/guard/jwt-auth.guard";
import {SearchingService} from "../service/searching.service";

@Controller("searching")
@UseGuards(JwtAuthGuard)
export class SearchingController {

    constructor(private readonly service: SearchingService) {
    }

    @Get("/next")
    public next(@Request() request) {
        return this.service.next(request.user.id);
    }
}