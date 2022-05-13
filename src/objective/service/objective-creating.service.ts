import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Objective} from "../entity/objective.entity";

@Injectable()
export class ObjectiveCreatingService {

    constructor(@InjectRepository(Objective) private readonly objectiveRepository: Repository<Objective>) {
        this.createOrIgnore("Convert Minutes into Seconds", "Write a function that takes an integer minutes and converts it to seconds.").then();
        this.createOrIgnore("Area of a Triangle", "Write a function that takes the base and height of a triangle and return its area.").then();
        this.createOrIgnore("How Much is True?", "Create a function which returns the number of true values there are in an array.").then();
    }

    private async createOrIgnore(title: string, description: string) {
        if(await this.objectiveRepository.findOne({title, description})) return;
        const objective = new Objective();
        objective.title = title;
        objective.description = description;
        this.objectiveRepository.createQueryBuilder()
            .insert()
            .values(objective)
            .execute()
            .then();
    }
}
