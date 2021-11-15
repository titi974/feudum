import {Controller, Get, Param, Post, Redirect} from '@nestjs/common';
import {PlateauService} from "./plateau.service";
import {RedirectOtherSee} from "../RedirectOtherSee";
import Plateau from "../../domain/entity/plateau/Plateau";
import PathURL from "../PathURL";
import PlateauId from "../../domain/valueObject/PlateauId";

@Controller(PathURL.PLATEAUX)
export class PlateauController extends RedirectOtherSee {

    constructor(private readonly plateauService: PlateauService) {
        super()
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<Plateau> {
        return this.plateauService.get(new PlateauId(id))
    }

}
