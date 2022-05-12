import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Country} from "./entity/country.entity";
import {GeoLocation} from "./entity/geo-location.entity";
import {Interest} from "./entity/interest.entity";
import {Language} from "./entity/language.entity";
import {ProgrammingLanguage} from "./entity/programming-language.entity";
import {Region} from "./entity/region.entity";
import {Sex} from "./entity/sex.entity";
import {City} from "./entity/city.entity";
import {DomainService} from "./service/domain.service";
import {DomainCreatingService} from "./service/domain-creating.service";
import {DomainController} from "./controller/domain.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            City, Country, GeoLocation, Interest, Language, ProgrammingLanguage, Region, Sex
        ]),
    ],
    providers: [DomainService, DomainCreatingService],
    exports: [DomainService, DomainCreatingService],
    controllers: [DomainController],
})
export class DomainModule {
}
