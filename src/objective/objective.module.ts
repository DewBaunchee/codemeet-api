import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Objective} from "./entity/objective.entity";
import {SolvedObjective} from "./entity/solved-objective.entity";
import {ObjectiveService} from "./service/objective.service";
import {ObjectiveCreatingService} from "./service/objective-creating.service";
import {ObjectiveController} from "./controller/objective.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Objective, SolvedObjective])
    ],
    providers: [ObjectiveService, ObjectiveCreatingService],
    exports: [ObjectiveService, ObjectiveCreatingService],
    controllers: [ObjectiveController],
})
export class ObjectiveModule {

}