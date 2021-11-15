import Partie from "./Partie";
import Joueur from "./joueur/Joueur";
import JoueurId from "../valueObject/JoueurId";
import {COULEURS} from "./COULEURS";
import Plateau from "./plateau/Plateau";
import PlateauId from "../valueObject/PlateauId";
import {MarchandiseFactory} from "./marchandise/Marchandise";
import {MARCHANDISES} from "./marchandise/MARCHANDISES";
import PartieId from "../valueObject/PartieId";

describe('Partie', () => {
    describe('instance', () => {
        it('avec un argument', () => {
            const plateauId = new PlateauId('1');
            const joueur1 = new Joueur(new JoueurId('1'), COULEURS.BLEU, 3, [MarchandiseFactory({
                type: MARCHANDISES.NOURRITURE,
                quantite: 3
            })]);
            const joueur2 = new Joueur(new JoueurId('2'), COULEURS.BLEU, 3, [MarchandiseFactory({
                type: MARCHANDISES.NOURRITURE,
                quantite: 3
            })]);
            const plateau = new Plateau(plateauId);
            expect(new Partie(new PartieId('1'), [joueur1, joueur2], plateau)).toBeDefined()
        })
    })
})
