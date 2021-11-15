import Guild from "../guild/Guild";
import Case from "../case/Case";
import PlateauId from "../../valueObject/PlateauId";
import {GUILD_NOMS} from "../guild/GUILD_NOMS";
import Joueur from "../joueur/Joueur";
import CaseId from "../../valueObject/CaseId";
import Personnage from "../../valueObject/Personnage";
import {Optional} from "@eastbanctech/ts-optional";
import MauvaisPionError from "../../error/MauvaisPionError";
import MauvaiseCaseError from "../../error/MauvaiseCaseError";
import GuildInconnueError from "../../error/GuildInconnueError";

export default class Plateau {
    constructor(public readonly id: PlateauId, private readonly guilds: Guild[] = [], public readonly cases: Case[] = []) {
    }

    migrer(joueur: Joueur, personnage: GUILD_NOMS, caseId: CaseId, surPlateau: boolean) {
        joueur.migrer(surPlateau)
        const nouveauPersonnage = new Personnage(personnage, joueur.couleur);
        const aCase = Optional.ofNullable(this.cases.find(uneCase => uneCase.id.same(caseId)))
            .orElseThrow(() => new MauvaiseCaseError(caseId.value));
        const guild = Optional.ofNullable(this.guilds.find(laGuild => laGuild.nom === personnage))
            .orElseThrow(() => new GuildInconnueError(personnage));
        if (surPlateau) {
            aCase.ajouterPersonnage(nouveauPersonnage)
        } else {
            const personnageOptional = Optional.ofNullable(aCase.personnages.find(unPersonnage => unPersonnage.same(nouveauPersonnage)));
            personnageOptional.orElseThrow(() => new MauvaisPionError())
            aCase.retirerPersonnage(nouveauPersonnage)
        }
        guild.calculerStatut(this.cases)
    }

    status(): Guild[] {
        return this.guilds
    }
}
