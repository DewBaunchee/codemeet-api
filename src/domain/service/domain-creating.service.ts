import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Interest, InterestCategoryType, InterestType} from "../entity/interest.entity";
import {Repository} from "typeorm";
import {Language} from "../entity/language.entity";
import {ProgrammingLanguage, ProgrammingLanguageKey} from "../entity/programming-language.entity";
import {Sex, SexType} from "../entity/sex.entity";
import {Country} from "../entity/country.entity";
import {City} from "../entity/city.entity";
import {Region} from "../entity/region.entity";
import {GeoLocation} from "../entity/geo-location.entity";
import {isPresent} from "../../common/cm-lang";
import {FindConditions} from "typeorm/find-options/FindConditions";

@Injectable()
export class DomainCreatingService {

    constructor(@InjectRepository(Interest) private readonly interestRepository: Repository<Interest>,
                @InjectRepository(Country) private readonly countryRepository: Repository<Country>,
                @InjectRepository(Region) private readonly regionRepository: Repository<Region>,
                @InjectRepository(City) private readonly cityRepository: Repository<City>,
                @InjectRepository(GeoLocation) private readonly geoLocationRepository: Repository<GeoLocation>,
                @InjectRepository(Language) private readonly languageRepository: Repository<Language>,
                @InjectRepository(ProgrammingLanguage) private readonly programmingLanguageRepository: Repository<ProgrammingLanguage>,
                @InjectRepository(Sex) private readonly sexRepository: Repository<Sex>) {
        (async () => {
            await this.createInterest(InterestType.TENNIS, InterestCategoryType.SPORT);
            await this.createInterest(InterestType.FOOTBALL, InterestCategoryType.SPORT);
            await this.createInterest(InterestType.BASEBALL, InterestCategoryType.SPORT);
            await this.createInterest(InterestType.RACING, InterestCategoryType.EXTREME);
            await this.createInterest(InterestType.SKIING, InterestCategoryType.EXTREME);
            await this.createInterest(InterestType.VIDEO_GAMES, InterestCategoryType.TIME_SPENDING);
            await this.createInterest(InterestType.FILMS, InterestCategoryType.TIME_SPENDING);
            await this.createInterest(InterestType.DESIGN, InterestCategoryType.IT);
            await this.createInterest(InterestType.NEURAL_NETWORKS, InterestCategoryType.IT);

            const belarus = await this.createCountry("BLR", "Belarus", "Republic of Belarus", "375");
            const region = await this.createRegion("Minsk", belarus);
            await this.createCity("Minsk", region, 53.893009, 27.567444);

            const russia = await this.createCountry("RUS", "Russia", "Russian Federation", "7");
            await this.createCountry("KAZ", "Kazakhstan", "Kazakhstan", "7");

            await this.createLanguage("be", "Belarusian", belarus);
            await this.createLanguage("ru", "Russian", russia);
            await this.createLanguage("en", "English");

            await this.createProgrammingLanguage(ProgrammingLanguageKey.JAVA, "Java");
            await this.createProgrammingLanguage(ProgrammingLanguageKey.CPP, "C++");
            await this.createProgrammingLanguage(ProgrammingLanguageKey.CSHARP, "C#");
            await this.createProgrammingLanguage(ProgrammingLanguageKey.C, "C");
            await this.createProgrammingLanguage(ProgrammingLanguageKey.KOTLIN, "Kotlin");
            await this.createProgrammingLanguage(ProgrammingLanguageKey.JAVASCRIPT, "JavaScript");
            await this.createProgrammingLanguage(ProgrammingLanguageKey.PYTHON, "Python");
            await this.createProgrammingLanguage(ProgrammingLanguageKey.HTML, "HTML");
            await this.createProgrammingLanguage(ProgrammingLanguageKey.TYPESCRIPT, "TypeScript");

            await this.createSex(SexType.UNKNOWN);
            await this.createSex(SexType.MALE);
            await this.createSex(SexType.FEMALE);
        })();
    }

    private async createInterest(key: InterestType, category: InterestCategoryType): Promise<Interest> {
        const interest = new Interest();
        interest.key = key;
        interest.category = category;
        await createOrIgnore(interest, this.interestRepository);
        return interest;
    }

    private async createCountry(isoCode: string, name: string, officialName: string, phoneCode: string): Promise<Country> {
        const country = new Country()
        country.isoCode = isoCode;
        country.name = name;
        country.officialName = officialName;
        country.phoneCode = phoneCode;
        country.flag = Buffer.from("");
        await createOrIgnore(country, this.countryRepository);
        return country;
    }

    private async createRegion(name: string, country: Country): Promise<Region> {
        return findByOr({name, country}, this.regionRepository, async () => {
            const region = new Region();
            region.name = name;
            region.country = country;
            await createOrIgnore(region, this.regionRepository);
            return region;
        });
    }

    private async createCity(name: string, region: Region, latitude: number, longitude: number): Promise<City> {
        return findByOr({name, region}, this.cityRepository, async () => {
            const geoLocation = await findByOr({latitude, longitude}, this.geoLocationRepository, async () => {
                return createOrIgnore(new GeoLocation(latitude, longitude), this.geoLocationRepository);
            });

            const city = new City();
            city.name = name;
            city.region = region;
            city.geoLocation = geoLocation;
            await createOrIgnore(city, this.cityRepository);
            return city;
        });
    }

    private async createLanguage(key: string, label: string, country?: Country): Promise<Language> {
        const language = new Language();
        language.key = key;
        language.label = label;
        language.country = country;
        await createOrIgnore(language, this.languageRepository);
        return language;
    }

    private async createProgrammingLanguage(key: ProgrammingLanguageKey, label: string): Promise<ProgrammingLanguage> {
        const programmingLanguage = new ProgrammingLanguage();
        programmingLanguage.key = key;
        programmingLanguage.label = label;
        await createOrIgnore(programmingLanguage, this.programmingLanguageRepository);
        return programmingLanguage;
    }

    private async createSex(key: SexType): Promise<Sex> {
        const sex = new Sex();
        sex.key = key;
        await createOrIgnore(sex, this.sexRepository);
        return sex;
    }
}

const findByOr = async <R>(conditions: FindConditions<R>, repository: Repository<R>, or: () => Promise<R>): Promise<R> => {
    const alreadyCreated = await repository.findOne(conditions);
    if (isPresent(alreadyCreated)) return alreadyCreated;

    return or();
};

const createOrIgnore = async <E>(entity: E, repository: Repository<E>) => {
    await repository.createQueryBuilder()
        .insert()
        .values(entity)
        .orIgnore()
        .execute()
        .then();
    return entity;
};
