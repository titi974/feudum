import {UneGuild} from "./Guild";
import {GUILD_NOMS} from "./GUILD_NOMS";
import Marchandise from "../marchandise/Marchandise";
import Case from "../case/Case";

export enum PRODUITS {
    KRUK = 'KRUK',
    AERONEPHE = 'AERONEPHE',
    SOUS_MARIN = 'SOUS_MARIN',
    BATEAU = 'BATEAU',
}

export type Galerie = { produit: PRODUITS, prix: Marchandise[] }

export default class Alchimiste extends UneGuild {
    private readonly limit = 3

    constructor(private readonly caisse: Galerie[] = []) {
        super();
        this.nom = GUILD_NOMS.ALCHIMISTE
    }

    calculerStatut(cases: Case[]): void {
    }
}
