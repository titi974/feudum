import Marchandise, {MarchandiseFactory} from "../marchandise/Marchandise";
import {MARCHANDISES} from "../marchandise/MARCHANDISES";
import {UneGuild} from "./Guild";
import {GUILD_NOMS} from "./GUILD_NOMS";
import Case from "../case/Case";

export default class Fermier extends UneGuild {
    public readonly nom = GUILD_NOMS.FERMIER
    private readonly maxPoulet = 4

    constructor(private readonly poulets: number[] = [],
                private readonly marchandises: Marchandise[] = []) {
        super()
        this.poulets.push(2)
        this.marchandises.push(MarchandiseFactory({type: MARCHANDISES.NOURRITURE, quantite: 1}))
    }

    calculerStatut(cases: Case[]): void {
    }
}
