import CaseId from "./valueObject/CaseId";
import JoueurId from "./valueObject/JoueurId";
import {GUILD_NOMS} from "./entity/guild/GUILD_NOMS";
import PartieRepository from "./port/PartieRepository";
import JoueurRepository from "./port/JoueurRepository";

export type Migrer = (personnage: GUILD_NOMS, joueurId: JoueurId, caseId: CaseId, surPlateau: boolean) => Promise<void>

const makeMigrer = (joueurRepository: JoueurRepository, partieRepository: PartieRepository): Migrer => async (personnage: GUILD_NOMS, joueurId: JoueurId, caseId: CaseId, surPlateau: boolean): Promise<void> => {
    const joueur = await joueurRepository.getById(joueurId);
    const partie = await partieRepository.getByIdJoueur(joueurId);
    partie.plateau.migrer(joueur, personnage, caseId, surPlateau)
}

export default makeMigrer
