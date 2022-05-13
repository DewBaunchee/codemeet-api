import {Module} from "@nestjs/common";
import {SecurityModule} from "./security/security.module";
import {PersonModule} from "./person/person.module";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DomainModule} from "./domain/domain.module";
import * as path from "path";
import {ObjectiveModule} from "./objective/objective.module";
import {ExecutionModule} from "./execution/execution.module";
import {SearchingModule} from "./searching/searching.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env"],
            isGlobal: true
        }),
        SecurityModule,
        DomainModule,
        ObjectiveModule,
        SearchingModule,
        ExecutionModule,
        PersonModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [path.resolve(__dirname, "**/*.entity{.ts,.js}")],
            synchronize: true,
        }),
    ]
})
export class AppModule {
}
