import {Module} from "@nestjs/common";
import {PersonService} from "./service/person.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DomainModule} from "../domain/domain.module";
import {Person} from "./entity/person.entity";
import {Language} from "../domain/entity/language.entity";
import {Country} from "../domain/entity/country.entity";
import {PersonController} from "./controller/person.controller";
import {ProfileController} from "./controller/profile.controller";
import {ProfileService} from "./service/profile.service";
import {Profile} from "./entity/profile.entity";
import {Photo} from "./entity/photo.entity";

@Module({
    imports: [
        DomainModule,
        TypeOrmModule.forFeature([
            Person,
            Profile,
            Photo,
            Country,
            Language
        ])
    ],
    providers: [PersonService, ProfileService],
    exports: [PersonService, ProfileService],
    controllers: [PersonController, ProfileController],
})
export class PersonModule {
}
