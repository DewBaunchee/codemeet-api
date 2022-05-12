import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Profile} from "../entity/profile.entity";
import {Repository} from "typeorm";
import {Person} from "../entity/person.entity";
import {Photo} from "../entity/photo.entity";

@Injectable()
export class ProfileService {

    constructor(@InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
                @InjectRepository(Person) private readonly personRepository: Repository<Person>,
                @InjectRepository(Photo) private readonly photoRepository: Repository<Photo>) {
    }

    public create(profile: Profile): Promise<Profile> {
        return this.profileRepository.insert(profile).then(() => profile);
    }

    public get(personId: number): Promise<Profile> {
        return this.profileRepository
            .findOne({
                where: {person: personId},
            });
    }

    public changeName(personId: number, newName: string) {
        return (async () => {
            const person = await this.personRepository.findOne(personId);
            person.name = newName;
            return this.personRepository.save(person);
        })();
    }

    public merge(personId: number, profile: Profile) {
        return (async () => {
            const storedProfile = await this.get(personId);
            storedProfile.interests = profile.interests || storedProfile.interests;
            storedProfile.languages = profile.languages || storedProfile.languages;
            storedProfile.programmingLanguages = profile.programmingLanguages || storedProfile.programmingLanguages;
            return this.profileRepository.save(storedProfile);
        })();
    }

    public async addPhotos(personId: number, data: Buffer[]) {
        const profile = await this.get(personId);
        return this.photoRepository.insert(data.map(buffer => {
            const photo = new Photo();
            photo.profile = profile;
            photo.data = buffer;
            return photo;
        }));
    }

    public async setAvatar(personId: number, photoId: number) {
        const profile = await this.get(personId);
        profile.mainPhoto = await this.photoRepository.findOne({id: photoId});
        return this.profileRepository.save(profile);
    }
}