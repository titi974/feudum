import JoueurId from "../valueObject/JoueurId";
import Joueur from "../entity/joueur/Joueur";

export default interface JoueurRepository {
    insert(joueur: Joueur): Promise<void>

    getById(id: JoueurId): Promise<Joueur>
}
