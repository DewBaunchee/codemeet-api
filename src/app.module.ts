import { Module } from "@nestjs/common";
import { SecurityModule } from "./security/security.module";
import { PersonModule } from "./person/person.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env"],
            isGlobal: true
        }),
        SecurityModule,
        PersonModule,
    ]
})
export class AppModule {
}
