import {GUILD_NOMS} from "./GUILD_NOMS";
import Case from "../case/Case";
import {STATUS_GUILD} from "../STATUS_GUILD";
import {COULEURS} from "../COULEURS";

export type CompteurStatut = [COULEURS, number]

export default interface Guild {
    nom: GUILD_NOMS
    status: Map<STATUS_GUILD, CompteurStatut>

    calculerStatut(cases: Case[]): void;
}

export abstract class UneGuild implements Guild {
    nom: GUILD_NOMS
    readonly status: Map<STATUS_GUILD, CompteurStatut> = new Map()

    abstract calculerStatut(cases: Case[]): void

    constructor() {
        this.status.set(STATUS_GUILD.MAITRE, null)
        this.status.set(STATUS_GUILD.APPRENTIE, null)
    }
}
