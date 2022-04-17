import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthenticationService } from "../service/authentication.service";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";

@Controller("auth")
export class AuthenticationController {

    constructor(private readonly authService: AuthenticationService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    public login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    public getProfile(@Request() req) {
        return req.user;
    }
}