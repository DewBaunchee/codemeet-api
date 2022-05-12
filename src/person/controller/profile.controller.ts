import {Controller, Get, Post, Request, UploadedFiles, UseGuards, UseInterceptors} from "@nestjs/common";
import {JwtAuthGuard} from "../../security/guard/jwt-auth.guard";
import {ProfileService} from "../service/profile.service";
import {ProfileDto, profileToDto} from "../dto/profile.dto";
import {FilesInterceptor} from "@nestjs/platform-express";

@Controller("person/profile")
@UseGuards(JwtAuthGuard)
export class ProfileController {

    constructor(private readonly profileService: ProfileService) {
    }

    @Get("load")
    public load(@Request() request) {
        return this.loadProfile(request.user.id);
    }

    @Post("change/name")
    public changeName(@Request() request) {
        this.profileService.changeName(request.user.id, request.body.name).then();
    }

    @Post("merge")
    public merge(@Request() request) {
        return this.profileService.merge(request.user.id, request.body).then(profileToDto);
    }

    @Post("photo/add")
    @UseInterceptors(FilesInterceptor("photos"))
    public addPhoto(@Request() request, @UploadedFiles() files: Array<Express.Multer.File>) {
        return this.profileService.addPhotos(request.user.id, files.map(file => file.buffer))
            .then(() => this.loadProfile(request.user.id));
    }

    @Post("avatar/set")
    public setAvatar(@Request() request) {
        return this.profileService.setAvatar(request.user.id, request.body.photoId)
            .then(() => this.loadProfile(request.user.id));
    }

    private loadProfile(personId: number): Promise<ProfileDto> {
        return this.profileService.get(personId).then(profileToDto);
    }
}