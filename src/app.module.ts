import { Module } from "@nestjs/common";
import { SecurityModule } from "./security/security.module";
import { PersonModule } from "./person/person.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import {Person} from "./person/entity/person.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [".env"],
            isGlobal: true
        }),
        SecurityModule,
        PersonModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [Person],
            synchronize: true,
        }),
    ]
})
export class AppModule {
}
