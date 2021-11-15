import MarqueInfluence from "./MarqueInfluence";
import {COULEURS} from "./COULEURS";

describe('Marqueur Influence', () => {
    let marqueur: MarqueInfluence
    beforeEach(() => {
        marqueur = new MarqueInfluence({couleur: COULEURS.BLEU, quantite: 3})
    })
    it('instance', () => {
        expect(marqueur).toBeDefined()
    })
    describe('afficher', () => {
        it('la couleur', () => {
            expect(marqueur.couleur).toEqual(COULEURS.BLEU)
        })
        it('la quantite', () => {
            expect(marqueur.quantite).toEqual(3)
        })
    })
    it('ajouter un quantite', () => {
        marqueur.ajouter(1)
        expect(marqueur.quantite).toEqual(4)
    })
})
