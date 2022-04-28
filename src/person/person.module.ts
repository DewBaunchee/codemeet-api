import { Module } from '@nestjs/common';
import { PersonService } from "./service/person.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "./entity/person.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Person])],
    providers: [PersonService],
    exports: [PersonService],
})
export class PersonModule {}
