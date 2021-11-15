import Plateau from "./plateau/Plateau";
import Joueur from "./joueur/Joueur";
import PartieId from "../valueObject/PartieId";

export default class Partie {
    constructor(public readonly id: PartieId, public readonly joueurs: Joueur[], public readonly plateau: Plateau) {
    }
}
