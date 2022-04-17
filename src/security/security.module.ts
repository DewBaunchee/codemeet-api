import { Module } from "@nestjs/common";
import { AuthenticationService } from "./service/authentication.service";
import { PassportModule } from "@nestjs/passport";
import { PersonModule } from "../person/person.module";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import {  SecurityConfig } from "./security-config";
import { AuthenticationController } from "./controller/authentication.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        PassportModule,
        PersonModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "60m" },
        })
    ],
    providers: [AuthenticationService, LocalStrategy, JwtStrategy, SecurityConfig],
    controllers: [AuthenticationController],
})
export class SecurityModule {

}