import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {PersonService} from "../../person/service/person.service";
import {lastValueFrom} from "rxjs";
import {RegistrationDto} from "../../person/dto/registration.dto";
import {Person} from "../../person/entity/person.entity";
import {PasswordEncoder} from "../password/password-encoder.service";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthenticationService {

    constructor(private readonly personService: PersonService,
                private readonly configService: ConfigService,
                private readonly jwtService: JwtService,
                private readonly passwordEncoder: PasswordEncoder) {
    }

    public async validateUser(phoneNumber: string, password: string): Promise<any> {
        const person = await lastValueFrom(this.personService.get(phoneNumber));
        if (person && this.passwordEncoder.compare(password, person.password)) {
            return {...person, password: undefined};
        }
        return null;
    }

    public login(person: Person) {
        return {
            access_token: this.jwtService.sign(
                {username: person.phoneNumber},
                {expiresIn: this.getExpirationDate()}
            )
        };
    }

    public registration(body: RegistrationDto) {
        const person = new Person();
        person.name = body.name;
        person.phoneNumber = body.phoneNumber;
        person.password = this.passwordEncoder.encode(body.password, body.salt);
        this.personService.create(person);
    }

    public generateSalt(): string {
        return this.passwordEncoder.generateSalt();
    }

    private getExpirationDate(): number {
        return new Date().getTime() + this.configService.get("JWT_ACCESS_LIFETIME") * 60 * 1000;
    }
}