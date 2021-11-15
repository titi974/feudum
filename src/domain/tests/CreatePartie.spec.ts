import makeCreatePartie, {CreatePartie} from "../CreatePartie";
import PartieMemory from "../../infrastructure/memory/PartieMemory";
import PlateauMemory from "../../infrastructure/memory/PlateauMemory";
import CaseMemory from "../../infrastructure/memory/CaseMemory";
import GuildMemory from "../../infrastructure/memory/GuildMemory";
import JoueurMemory from "../../infrastructure/memory/JoueurMemory";
import GenerateurUUID from "../../infrastructure/generateur/GenerateurUUID";
import PartieId from "../valueObject/PartieId";
import GenererUnNombreAleatoire from "../../infrastructure/generateur/GenererUnNombreAleatoire";
import PartieRepository from "../port/PartieRepository";
import Joueur from "../entity/joueur/Joueur";
import JoueurId from "../valueObject/JoueurId";
import {COULEURS} from "../entity/COULEURS";
import {MarchandiseFactory} from "../entity/marchandise/Marchandise";
import {MARCHANDISES} from "../entity/marchandise/MARCHANDISES";

class GenerateurUUIDMock implements GenerateurUUID {
    execute(): string {
        return "";
    }
}

describe('Créer une partie', () => {
    let creation: CreatePartie
    let partieMemory: PartieRepository;
    beforeEach(() => {
        partieMemory = new PartieMemory();
        const generateurUUID = new GenerateurUUIDMock();
        const plateauMemory = new PlateauMemory();
        const caseMemory = new CaseMemory();
        const genererUnNombreAleatoire = new GenererUnNombreAleatoire();
        const guildMemory = new GuildMemory(genererUnNombreAleatoire);
        const joueurMemory = new JoueurMemory();
        jest.spyOn(generateurUUID, 'execute').mockReturnValueOnce('partieId')
        jest.spyOn(generateurUUID, 'execute').mockReturnValueOnce('plateauId')
        jest.spyOn(generateurUUID, 'execute').mockReturnValueOnce('moiId')
        jest.spyOn(generateurUUID, 'execute').mockReturnValueOnce('botId')
        creation = makeCreatePartie(partieMemory, generateurUUID, plateauMemory, caseMemory, guildMemory, joueurMemory)
    })
    afterEach(() => {
        jest.resetAllMocks()
    })
    describe('avec succès', () => {
        let numeroPartie: PartieId
        describe('mode solo', () => {
            it('Partie id', async () => {
                numeroPartie = await creation();
                expect(numeroPartie.same(new PartieId('partieId'))).toBe(true)
            })
            describe('joueur', () => {
                it('retoruver les joueurs', async () => {
                    const initMarchandise = [MarchandiseFactory({
                        type: MARCHANDISES.NOURRITURE,
                        quantite: 3
                    })]
                    numeroPartie = await creation();
                    const partie = await partieMemory.getById(numeroPartie);
                    expect(partie).toBeDefined()
                    expect(partie.joueurs).toHaveLength(2)
                    partie.joueurs.forEach(joueur => expect([
                        new Joueur(new JoueurId('moiId'), COULEURS.BLEU, 3, initMarchandise),
                        new Joueur(new JoueurId('botId'), COULEURS.VERT, 3, initMarchandise)])
                        .toContainEqual(joueur)
                    )
                })
            })
            describe.skip('plateau',() => {})
        })
    })

})
