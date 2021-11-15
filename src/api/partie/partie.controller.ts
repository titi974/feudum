import {Controller, Get, Param, Post, Redirect} from '@nestjs/common';
import PathURL from "../PathURL";
import {RedirectOtherSee} from "../RedirectOtherSee";
import {PartieService} from "./partie.service";
import Partie from "../../domain/entity/Partie";
import PartieId from "../../domain/valueObject/PartieId";

@Controller(PathURL.PARTIES)
export class PartieController extends RedirectOtherSee {

    constructor(private readonly partieService: PartieService) {
        super()
    }

    @Post()
    @Redirect(PathURL.PARTIES, 303)
    async create() {
        const idPartie = await this.partieService.create();
        return this.redirect(PathURL.PARTIES, { uri: [idPartie]} )
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<Partie>{
        return this.partieService.getById(new PartieId(id))
    }

}
