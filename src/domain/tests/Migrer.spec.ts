import makeMigrer, {Migrer} from "../Migrer";
import JoueurMemory from "../../infrastructure/memory/JoueurMemory";
import PartieMemory from "../../infrastructure/memory/PartieMemory";
import {GUILD_NOMS} from "../entity/guild/GUILD_NOMS";
import JoueurId from "../valueObject/JoueurId";
import CaseId from "../valueObject/CaseId";
import Joueur from "../entity/joueur/Joueur";
import {COULEURS} from "../entity/COULEURS";
import Partie from "../entity/Partie";
import Plateau from "../entity/plateau/Plateau";
import PlateauId from "../valueObject/PlateauId";
import Case, {CaseFactory} from "../entity/case/Case";
import {REGIONS} from "../entity/REGIONS";
import {LIEUX} from "../entity/case/LIEUX";
import {PaysageFactory, PAYSAGES} from "../entity/case/Paysage";
import {MarchandiseFactory} from "../entity/marchandise/Marchandise";
import {MARCHANDISES} from "../entity/marchandise/MARCHANDISES";
import PionEpuiseError from "../entity/joueur/error/PionEpuiseError";
import ManqueNourritureError from "../entity/marchandise/error/ManqueNourritureError";
import MauvaiseCaseError from "../error/MauvaiseCaseError";
import MauvaisPionError from "../error/MauvaisPionError";
import MigrationSansPionError from "../error/MigrationSansPionError";
import Personnage from "../valueObject/Personnage";
import {STATUS_GUILD} from "../entity/STATUS_GUILD";
import Noble from "../entity/guild/Noble";
import Fermier from "../entity/guild/Fermier";
import DomainError from "../entity/DomainError";
import SpyInstance = jest.SpyInstance;

const each = require("jest-each").default;
const bleu = COULEURS.BLEU
const preparePlateau = (aCase: Case, joueurInfo: { joueurId: JoueurId, pions: number } = {
    joueurId: new JoueurId('1'),
    pions: 1
}): { migrer: Migrer, spyJoueur: SpyInstance, plateau, joueur: Joueur } => {
    const joueurMemory = new JoueurMemory();
    const partieMemory = new PartieMemory();
    const plateau = new Plateau(new PlateauId('1'), [new Noble(), new Fermier()], [aCase])
    const spyJoueur = jest.spyOn(joueurMemory, 'getById');
    const joueur = new Joueur(new JoueurId('1'), bleu, joueurInfo.pions, [MarchandiseFactory({
        type: MARCHANDISES.NOURRITURE,
        quantite: 1
    })])
    jest.spyOn(partieMemory, 'getByIdJoueur').mockResolvedValue({plateau} as Partie)
    spyJoueur.mockResolvedValue(joueur)
    return {migrer: makeMigrer(joueurMemory, partieMemory), joueur, spyJoueur, plateau}
}

const caseDepart = (isDepart = false, paysage = PaysageFactory(PAYSAGES.ARCHER)) => CaseFactory('1', REGIONS.TERRE_SAUVAGE, isDepart, LIEUX.FIEF, 'N', paysage, new Personnage(GUILD_NOMS.MOINE, bleu))
describe('Migrer', () => {
    const joueurId = new JoueurId('1')
    const caseId = new CaseId('1')
    const bleu = COULEURS.BLEU;
    const paysage = PaysageFactory(PAYSAGES.ARCHER);
    let plateau: Plateau
    let migrer: Migrer
    let spyJoueur
    let aCase
    afterEach(() => jest.resetAllMocks())
    describe('un personnage', () => {
        describe('vers le plateau', () => {
            let joueur
            beforeEach(() => {
                aCase = CaseFactory('1', REGIONS.TERRE_SAUVAGE, true, LIEUX.FIEF, 'N', paysage, new Personnage(GUILD_NOMS.MOINE, bleu))
                const makePlateau = preparePlateau(aCase, {joueurId, pions: 1});
                plateau = makePlateau.plateau
                migrer = makePlateau.migrer
                spyJoueur = makePlateau.spyJoueur
                joueur = makePlateau.joueur
            })
            describe('avec succes', () => {
                it('avec un pion', async () => {
                    await migrer(GUILD_NOMS.NOBLE, joueurId, caseId, true)
                    expect(joueur.nombreDePion()).toBe(0)
                    expect(joueur.nourriture()).toEqual(0)
                    const caseFind = plateau.cases.find(c => c.same(aCase));
                    expect(caseFind).toBeDefined()
                    expect(caseFind.personnages).toHaveLength(2)
                    const personnage = caseFind.personnages[1];
                    expect(personnage.guild).toEqual(GUILD_NOMS.NOBLE)
                })
                describe(`calcul du status d'une guild`, () => {
                    beforeEach(() => {
                        plateau.cases[0].personnages.push(new Personnage(GUILD_NOMS.NOBLE, COULEURS.VERT))
                    })
                    it(`sur une case de départ`, async () => {
                        await migrer(GUILD_NOMS.NOBLE, joueurId, caseId, true)
                        const guild = plateau.status().filter(g => g.nom === GUILD_NOMS.NOBLE)[0]
                        const [couleur,] = guild.status.get(STATUS_GUILD.MAITRE);
                        expect(couleur).toEqual(COULEURS.VERT)
                    })
                    it(`sur une case déjà occupée`, async () => {
                        await migrer(GUILD_NOMS.NOBLE, joueurId, caseId, true)
                        const guild = plateau.status().filter(g => g.nom === GUILD_NOMS.NOBLE)[0]
                        const [couleur,] = guild.status.get(STATUS_GUILD.MAITRE);
                        expect(couleur).toEqual(COULEURS.VERT)
                    })
                })
            })
            describe('avec erreur', () => {
                each([
                    [
                        'sans pion sur une case non de départ',
                        CaseFactory('1', REGIONS.TERRE_SAUVAGE, false, LIEUX.FIEF, 'N', paysage, new Personnage(GUILD_NOMS.MOINE, bleu)),
                        new PionEpuiseError()
                    ],
                    [
                        'sans nourriture',
                        CaseFactory('1', REGIONS.TERRE_SAUVAGE, true, LIEUX.FIEF, 'N', paysage, new Personnage(GUILD_NOMS.MOINE, bleu)),
                        new ManqueNourritureError()
                    ],
                ]).it("'%s'", async (text: string, aCase: Case, error: DomainError) => {
                    let result
                    try {
                        await migrer(GUILD_NOMS.NOBLE, joueurId, caseId, true)
                    } catch
                        (e) {
                        result = e
                    }
                    expect(result).toEqual(error)
                })
                // it('sans pion sur une case non de départ', async () => {
                //     const error = new PionEpuiseError()
                //     aCase = CaseFactory('1', REGIONS.TERRE_SAUVAGE, false, LIEUX.FIEF, 'N', paysage, new Personnage(GUILD_NOMS.MOINE, bleu))
                //     let result
                //     try {
                //         await migrer(GUILD_NOMS.NOBLE, joueurId, caseId, true)
                //     } catch (e) {
                //         result = e
                //     }
                //     expect(result).toEqual(error)
                // })
                // it('sans nourriture', async () => {
                //     const error = new ManqueNourritureError()
                //     let result
                //     joueur = new Joueur(joueurId, bleu, 1, [MarchandiseFactory({
                //         type: MARCHANDISES.NOURRITURE,
                //         quantite: 0
                //     })]);
                //     spyJoueur.mockResolvedValue(joueur)
                //     try {
                //         await migrer(GUILD_NOMS.NOBLE, joueurId, caseId, true)
                //     } catch (e) {
                //         result = e
                //     }
                //     expect(result).toEqual(error)
                // })
                it('case sans pion', async () => {
                    const partieMemory = new PartieMemory();
                    aCase = CaseFactory('1', REGIONS.TERRE_SAUVAGE, false, LIEUX.FIEF, 'N', paysage)
                    plateau = new Plateau(new PlateauId('1'), [], [aCase])
                    jest.spyOn(partieMemory, 'getByIdJoueur').mockResolvedValue({plateau} as Partie)
                    const error = new MigrationSansPionError(bleu)
                    let result
                    try {
                        await migrer(GUILD_NOMS.NOBLE, joueurId, caseId, true)
                    } catch (e) {
                        result = e
                    }
                    expect(result).toEqual(error)
                })
            })
        })
        describe.skip('hors du plateau', () => {
            it('avec success', async () => {
                const joueur = new Joueur(joueurId, bleu, 1, [MarchandiseFactory({
                    type: MARCHANDISES.NOURRITURE,
                    quantite: 1
                })]);
                spyJoueur.mockResolvedValue(joueur)
                await migrer(GUILD_NOMS.NOBLE, joueurId, caseId, true)
                expect(aCase.personnages).toHaveLength(2)
                expect(joueur.nombreDePion()).toEqual(0)
                expect(joueur.nourriture()).toEqual(0)
                await migrer(GUILD_NOMS.NOBLE, joueurId, caseId, false)
                expect(aCase.personnages).toHaveLength(1)
                expect(joueur.nombreDePion()).toEqual(1)
                expect(joueur.nourriture()).toEqual(0)
            })
            describe('avec erreur', () => {
                describe(`quand le pion`, () => {
                    it(`n'est pas le bon personnage`, async () => {
                        const error = new MauvaisPionError()
                        const joueur = new Joueur(joueurId, bleu, 1, [MarchandiseFactory({
                            type: MARCHANDISES.NOURRITURE,
                            quantite: 1
                        })]);
                        spyJoueur.mockResolvedValue(joueur)
                        let result
                        await migrer(GUILD_NOMS.NOBLE, joueurId, caseId, true)
                        try {
                            await migrer(GUILD_NOMS.FERMIER, joueurId, caseId, false)
                        } catch (e) {
                            result = e
                        }
                        expect(result).toEqual(error)
                    })
                })
            })
            it(`quand la case n'existe pas`, async () => {
                const mauvaiseCaseId = new CaseId('2');
                const error = new MauvaiseCaseError(mauvaiseCaseId.value)
                const joueur = new Joueur(joueurId, bleu, 1, [MarchandiseFactory({
                    type: MARCHANDISES.NOURRITURE,
                    quantite: 1
                })]);
                spyJoueur.mockResolvedValue(joueur)
                let result
                await migrer(GUILD_NOMS.NOBLE, joueurId, caseId, true)
                try {
                    await migrer(GUILD_NOMS.MOINE, joueurId, mauvaiseCaseId, false)
                } catch (e) {
                    result = e
                }
                expect(result).toEqual(error)
            })
        })
    })
})
