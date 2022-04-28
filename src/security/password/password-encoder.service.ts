import {Injectable} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PasswordEncoder {

    private readonly secret: string;

    constructor(configService: ConfigService) {
        this.secret = configService.get("APP_SECRET");
    }

    public encode(password: string, salt): string {
        return bcrypt.hashSync(password, salt);
    }

    public compare(password: string, encrypted: string): boolean {
        return bcrypt.compareSync(password, encrypted);
    }

    public generateSalt() {
        return bcrypt.genSaltSync();
    }
}