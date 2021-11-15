import {MARCHANDISES} from "../marchandise/MARCHANDISES";
import {GUILD_NOMS} from "./GUILD_NOMS";
import {UneGuild} from "./Guild";
import Marchandise, {MarchandiseFactory} from "../marchandise/Marchandise";
import Case from "../case/Case";

type offre = { marchandise: Marchandise, prix: number[] }

export default class Commercant extends UneGuild {
    public readonly nom = GUILD_NOMS.COMMERCANT
    private readonly limit = 5;
    private caisse: offre[] = []

    constructor(private salpetre: number,
                private souffre: number,
                private fer: number,
                private bois: number,
                private nourriture: number) {
        super()
        this.caisse.push({
            marchandise: MarchandiseFactory({type: MARCHANDISES.SALPETRE, quantite: 3}),
            prix: [4, 3, 2, 2]
        })
        this.caisse.push({
            marchandise: MarchandiseFactory({type: MARCHANDISES.SOUFFRE, quantite: 3}),
            prix: [3, 3, 2, 1]
        })
        this.caisse.push({marchandise: MarchandiseFactory({type: MARCHANDISES.FER, quantite: 5}), prix: [3, 2, 1, 1]})
        this.caisse.push({marchandise: MarchandiseFactory({type: MARCHANDISES.BOIS, quantite: 5}), prix: [2, 2, 1, 1]})
        this.caisse.push({
            marchandise: MarchandiseFactory({type: MARCHANDISES.NOURRITURE, quantite: 5}),
            prix: [2, 1, 1, 1]
        })
    }

    calculerStatut(cases: Case[]): void {
        throw new Error("Method not implemented.");
    }

}
