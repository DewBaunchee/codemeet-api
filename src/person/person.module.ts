import {Module} from "@nestjs/common";
import {PersonService} from "./service/person.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DomainModule} from "../domain/domain.module";
import {Person} from "./entity/person.entity";
import {Language} from "../domain/entity/language.entity";
import {Country} from "../domain/entity/country.entity";

@Module({
    imports: [
        DomainModule,
        TypeOrmModule.forFeature([
            Person,
            Country,
            Language
        ])
    ],
    providers: [PersonService],
    exports: [PersonService],
})
export class PersonModule {
}
