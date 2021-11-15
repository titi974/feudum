import JoueurId from "../../valueObject/JoueurId";
import {COULEURS} from "../COULEURS";
import PionEpuiseError from "./error/PionEpuiseError";
import Marchandise from "../marchandise/Marchandise";
import {MARCHANDISES} from "../marchandise/MARCHANDISES";

export default class Joueur {

    private readonly marchandises: Map<MARCHANDISES, Marchandise> = new Map()

    constructor(public readonly id: JoueurId, public readonly couleur = COULEURS.BLEU, private pionsPresent: number = 3, _marchandises: Marchandise[]) {
        _marchandises.forEach(marchandise => this.marchandises.set(marchandise.type(), marchandise))
    }

    migrer(surPlateau: boolean) {
        const nombrePion = surPlateau ? this.pionsPresent - 1 : this.pionsPresent + 1
        if (nombrePion < 0) {
            throw new PionEpuiseError()
        }
        if (surPlateau){
            this.marchandises.get(MARCHANDISES.NOURRITURE).retirer(1)
        }
        this.pionsPresent = nombrePion
    }

    nombreDePion(): number {
        return this.pionsPresent;
    }

    nourriture(): number {
        return this.marchandises.get(MARCHANDISES.NOURRITURE).quantite();
    }

}
