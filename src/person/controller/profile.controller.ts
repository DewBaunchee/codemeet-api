import {Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../../security/guard/jwt-auth.guard";
import {ProfileService} from "../service/profile.service";
import {lastValueFrom, map} from "rxjs";
import {profileToDto} from "../dto/profile.dto";

@Controller("person/profile")
export class ProfileController {

    constructor(private readonly profileService: ProfileService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("load")
    public load(@Request() request) {
        return lastValueFrom(
            this.profileService.get(request.user.id)
                .pipe(map(profileToDto))
        )
    }

    @UseGuards(JwtAuthGuard)
    @Post("merge")
    public merge(@Request() request) {

    }

}