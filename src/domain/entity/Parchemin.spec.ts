import Marchandise, {MarchandiseFactory} from "./marchandise/Marchandise";
import {MARCHANDISES} from "./marchandise/MARCHANDISES";
import Parchemin from "./Parchemin";

describe('Marchandise', () => {
    describe('instance', () => {
        it('avec un argument', () => {
            expect(new Parchemin(1)).toBeDefined()
        })
        it('avec 2 arguments', () => {
            expect(new Parchemin(1, false)).toBeDefined()
        })
    })
    describe('afficher', () => {
        it('a un seau', () => {
            const parchemin = new Parchemin(1, true);
            expect(parchemin.hasSeau).toBe(true)
        })
    })
})
