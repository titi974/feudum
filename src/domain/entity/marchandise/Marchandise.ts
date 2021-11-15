import {MARCHANDISES} from "./MARCHANDISES";
import ManqueNourritureError from "./error/ManqueNourritureError";

type PropsMarchandise = { type: MARCHANDISES, quantite: number }

export default interface Marchandise {
    type(): MARCHANDISES;

    quantite(): number;

    ajouter(valeur: number): void

    retirer(number: number): void;
}

class UneMarchandise implements Marchandise {
    constructor(private readonly _type: MARCHANDISES, private _quantite: number) {
    }

    type(): MARCHANDISES {
        return this._type;
    }

    quantite(): number {
        return this._quantite;
    }

    ajouter(valeur: number) {
        this._quantite += valeur
    }

    retirer(valeur: number): void {
        if (this._quantite - valeur < 0){
            throw new ManqueNourritureError()
        }
        this._quantite -= valeur
    }
}

export const MarchandiseFactory = (props: PropsMarchandise): Marchandise => {
    return new UneMarchandise(props.type, props.quantite)
}
