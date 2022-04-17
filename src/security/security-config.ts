import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SecurityConfig {

    public readonly jwtSecret: string

    constructor(private readonly configService: ConfigService) {
        this.jwtSecret = this.configService.get("JWT_SECRET");
    }
}