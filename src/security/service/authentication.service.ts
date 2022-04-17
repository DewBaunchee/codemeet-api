import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PersonService } from "../../person/service/person.service";

@Injectable()
export class AuthenticationService {

    constructor(private readonly personService: PersonService,
                private readonly jwtService: JwtService) {
    }

    public async validateUser(username: string, password: string): Promise<any> {
        const user = await this.personService.findOne(username);
        if (user && user.password === password) {
            return { ...user, password: undefined };
        }
        return null;
    }
    
    public async login(user: any) {
        return {
            access_token: this.jwtService.sign({username: user.username, sub: user.userId})  
        };
    }
}