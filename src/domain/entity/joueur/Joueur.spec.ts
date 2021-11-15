import Joueur from "./Joueur";
import JoueurId from "../../valueObject/JoueurId";
import {COULEURS} from "../COULEURS";
import PionEpuiseError from "./error/PionEpuiseError";
import {MarchandiseFactory} from "../marchandise/Marchandise";
import {MARCHANDISES} from "../marchandise/MARCHANDISES";

describe('Joueur', () => {
    const joueurId = new JoueurId('1')
    const bleu = COULEURS.BLEU
    const surPlateau = true
    let joueur: Joueur
    beforeEach(() => {
        joueur = new Joueur(joueurId, bleu, 3, [MarchandiseFactory({type: MARCHANDISES.NOURRITURE, quantite: 10})])
    })
    describe('migrer', () => {
        it('avec suffisament de pion', () => {
            joueur.migrer(surPlateau)
            expect(joueur.nombreDePion()).toEqual(2)
        })
        it('pas suffisamment de pion', () => {
            expect(() => Array.from({length: 4}).forEach(i => joueur.migrer(surPlateau))).toThrowError(new PionEpuiseError())
        })
    })
})
