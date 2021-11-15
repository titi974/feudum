import Marchandise, {MarchandiseFactory} from "./Marchandise";
import {MARCHANDISES} from "./MARCHANDISES";

describe('Marchandise', () => {
    it('instance', () => {
        const marchandise = MarchandiseFactory({type: MARCHANDISES.NOURRITURE, quantite: 3});
        expect(marchandise).toBeDefined()
    })
    describe('afficher', () => {
        let marchandise: Marchandise
        beforeAll(() => {
            marchandise = MarchandiseFactory({type: MARCHANDISES.NOURRITURE, quantite: 3})
        })
        it('le type', () => {
            expect(marchandise.type()).toEqual(MARCHANDISES.NOURRITURE)
        })
        it('la quantite', () => {
            expect(marchandise.quantite()).toEqual(3)
        })
    })
    it('ajouter', () => {
        const marchandise = MarchandiseFactory({type: MARCHANDISES.NOURRITURE, quantite: 3});
        marchandise.ajouter(1)
        expect(marchandise.quantite()).toEqual(4)
    })
})
