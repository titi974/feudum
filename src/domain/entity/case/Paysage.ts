export enum PAYSAGES {
    VERGER = 'VERGER',
    ARCHER = 'ARCHER',
    MINE_ARGENT = 'MINE ARGENT',
    MINE_SOUFFRE = 'MINE SOUFFRE',

}


export default interface Paysage {
    nom: PAYSAGES
}

class unPaysage implements Paysage {
    constructor(public readonly nom: PAYSAGES) {
    }
}

export const PaysageFactory = (paysage: PAYSAGES): Paysage => {
    return new unPaysage(paysage)
}
