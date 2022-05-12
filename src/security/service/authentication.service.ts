import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {PersonService} from "../../person/service/person.service";
import {RegistrationDto} from "../../person/dto/registration.dto";
import {Person} from "../../person/entity/person.entity";
import {PasswordEncoder} from "../password/password-encoder.service";
import {ConfigService} from "@nestjs/config";
import {ProfileService} from "../../person/service/profile.service";
import {Profile} from "../../person/entity/profile.entity";

@Injectable()
export class AuthenticationService {

    constructor(private readonly personService: PersonService,
                private readonly profileService: ProfileService,
                private readonly configService: ConfigService,
                private readonly jwtService: JwtService,
                private readonly passwordEncoder: PasswordEncoder) {
    }

    public async validateUser(phoneNumber: string, password: string): Promise<any> {
        const person = await this.personService.get(phoneNumber);
        if (person && this.passwordEncoder.compare(password, person.password)) {
            return {...person, password: undefined};
        }
        return null;
    }

    public login(person: Person) {
        return {
            access_token: this.jwtService.sign({id: person.id})
        };
    }

    public registration(body: RegistrationDto) {
        const person = new Person();
        person.name = body.name;
        person.phoneNumber = body.phoneNumber;
        person.password = this.passwordEncoder.encode(body.password, body.salt);

        const profile = new Profile();
        profile.person = person;

        return this.personService.create(person).then(() => this.profileService.create(profile));
    }

    public generateSalt(): string {
        return this.passwordEncoder.generateSalt();
    }
}