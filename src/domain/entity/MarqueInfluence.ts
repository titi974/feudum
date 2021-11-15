import {COULEURS} from "./COULEURS";

type PropsMarqueurInfluence = { couleur: COULEURS, quantite: number }

export default class MarqueInfluence {
    private readonly _couleur: COULEURS
    private _quantite: number

    constructor(props: PropsMarqueurInfluence) {
        this._couleur = props.couleur
        this._quantite = props.quantite
    }

    get couleur(): COULEURS {
        return this._couleur;
    }

    get quantite(): number {
        return this._quantite;
    }

    ajouter(valeur: number) {
        this._quantite += valeur
    }

}
