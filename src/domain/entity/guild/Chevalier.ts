import MarqueInfluence from "../MarqueInfluence";
import {GUILD_NOMS} from "./GUILD_NOMS";
import {UneGuild} from "./Guild";
import Case from "../case/Case";

export enum MONSTRES {
    BEHMOTE = 'BEHMOTE',
    SERPENT = 'SERPENT'
}

export default class Chevalier extends UneGuild {
    public readonly nom = GUILD_NOMS.CHEVALIER


    constructor(private readonly monstres: MONSTRES[] = [],
                private readonly marqueurInfluences: MarqueInfluence[] = []) {
        super();
    }

    calculerStatut(cases: Case[]): void {
    }
}
