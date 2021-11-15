import {UneGuild} from "./Guild";
import {GUILD_NOMS} from "./GUILD_NOMS";
import Case from "../case/Case";

export default class Moine extends UneGuild {
    public readonly nom = GUILD_NOMS.MOINE
    private readonly limit = 7
    constructor(private readonly perles: number[]) {
        super()
    }

    calculerStatut(cases: Case[]): void {
    }
}
