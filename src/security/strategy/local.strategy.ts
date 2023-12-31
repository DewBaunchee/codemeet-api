import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthenticationService } from "../service/authentication.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthenticationService) {
        super();
    }

    public async validate(phone: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(phone, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}