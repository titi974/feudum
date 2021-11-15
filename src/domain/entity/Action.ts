import {ACTIONS} from "./carte/Carte";
import Personnage from "../valueObject/Personnage";
import CaseId from "../valueObject/CaseId";
import Joueur from "./joueur/Joueur";

export default interface Action {
    nom: ACTIONS
    execute: () => void
}

export class Migrer implements Action {

    public readonly nom = ACTIONS.MIGRER;

    constructor(private readonly joueur: Joueur, private readonly personnage: Personnage, private readonly caseId: CaseId) {
    }

    execute() {

    }
}
