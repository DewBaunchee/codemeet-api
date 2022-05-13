import {Module} from "@nestjs/common";
import {SearchingService} from "./service/searching.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LastVisited} from "./entities/last-visited.entity";
import {PersonModule} from "../person/person.module";
import {Person} from "../person/entity/person.entity";
import {SolvedObjective} from "../objective/entity/solved-objective.entity";
import {SearchingController} from "./controller/searching.controller";

@Module({
    imports: [
        PersonModule,
        TypeOrmModule.forFeature([LastVisited, Person, SolvedObjective])
    ],
    controllers: [SearchingController],
    providers: [SearchingService],
    exports: [SearchingService],
})
export class SearchingModule {
}