import PlateauRepository from "./port/PlateauRepository";
import CaseRepository from "./port/CaseRepository";
import GuildRepository from "./port/GuildRepository";
import JoueurRepository from "./port/JoueurRepository"
import GenerateurId from "./port/GenerateurId";
import Plateau from "./entity/plateau/Plateau";
import PlateauId from "./valueObject/PlateauId";
import JoueurId from "./valueObject/JoueurId";
import Partie from "./entity/Partie";
import Joueur from "./entity/joueur/Joueur";
import PartieId from "./valueObject/PartieId";
import PartieRepository from "./port/PartieRepository";
import {COULEURS} from "./entity/COULEURS";
import {MarchandiseFactory} from "./entity/marchandise/Marchandise";
import {MARCHANDISES} from "./entity/marchandise/MARCHANDISES";

export type CreatePartie = () => Promise<PartieId>

const makeCreatePartie = (partieRepository: PartieRepository, generateurId: GenerateurId,
                          plateauRepository: PlateauRepository,
                          caseRepository: CaseRepository, guildRepository: GuildRepository,
                          joueurRepository: JoueurRepository): CreatePartie => async (): Promise<PartieId> => {
    const partieId = new PartieId(generateurId.execute());
    const plateauId = new PlateauId(generateurId.execute());
    const cases = await caseRepository.initialiser();
    const guilds = await guildRepository.initialiser();
    const plateau = new Plateau(plateauId, guilds, cases);
    await plateauRepository.insert(plateau);

    const joueurIdMoi = new JoueurId(generateurId.execute());
    const joueurMoi = new Joueur(joueurIdMoi, COULEURS.BLEU, 3, [MarchandiseFactory({
        type: MARCHANDISES.NOURRITURE,
        quantite: 3
    })]);
    await joueurRepository.insert(joueurMoi)

    const joueurIdBot = new JoueurId(generateurId.execute());
    const joueurBot = new Joueur(joueurIdBot, COULEURS.VERT, 3, [MarchandiseFactory({
        type: MARCHANDISES.NOURRITURE,
        quantite: 3
    })]);
    await joueurRepository.insert(joueurBot)

    const partie = new Partie(partieId, [joueurBot, joueurMoi], plateau);
    await partieRepository.insert(partie)
    return partie.id
}

export default makeCreatePartie
