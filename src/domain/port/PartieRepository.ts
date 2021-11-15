import PartieId from "../valueObject/PartieId";
import Partie from "../entity/Partie";
import JoueurId from "../valueObject/JoueurId";

export default interface PartieRepository {
    getById(id: PartieId): Promise<Partie>
    getByIdJoueur(id: JoueurId): Promise<Partie>
    insert(partie: Partie): Promise<void>
}
