import {Body, Controller, Param, Post} from '@nestjs/common';
import PathURL from "../PathURL";
import {ACTIONS} from "../../domain/entity/carte/Carte";
import {RedirectOtherSee} from "../RedirectOtherSee";
import {JoueurService} from "./joueur.service";
import WebCommand from "../command/WebCommand";

@Controller(PathURL.JOUEURS)
export class JoueurController extends RedirectOtherSee {

    constructor(private readonly joueurService: JoueurService) {
        super()
    }

    @Post(`${PathURL.JOUEURS_ID}/${PathURL.ACTIONS}/${PathURL.ACTIONS_NAME}`)
    async agir(@Param('action') action: ACTIONS,
               @Param('joueurId') joueurId: string,
               @Body() actionCommand: WebCommand) {
        return this.joueurService.migrer(joueurId, actionCommand.migrer)
    }
}
