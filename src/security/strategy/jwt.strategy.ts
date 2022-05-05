import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {SecurityConfig} from "../security-config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly config: SecurityConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
            ignoreExpiration: false,
            secretOrKey: config.jwtSecret,
        });
    }

    public async validate(payload: any): Promise<any> {
        return {personId: payload.id}
    }
}