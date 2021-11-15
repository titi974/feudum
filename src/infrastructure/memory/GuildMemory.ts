import GuildRepository from "../../domain/port/GuildRepository";
import {Injectable} from "@nestjs/common";
import Guild from "../../domain/entity/guild/Guild";
import Alchimiste, {Galerie, PRODUITS} from "../../domain/entity/guild/Alchimiste";
import Chevalier, {MONSTRES} from "../../domain/entity/guild/Chevalier";
import Noble from "../../domain/entity/guild/Noble";
import Moine from "../../domain/entity/guild/Moine";
import Fermier from "../../domain/entity/guild/Fermier";
import Commercant from "../../domain/entity/guild/Commercant";
import Marchandise, {MarchandiseFactory} from "../../domain/entity/marchandise/Marchandise";
import {MARCHANDISES} from "../../domain/entity/marchandise/MARCHANDISES";
import {COULEURS} from "../../domain/entity/COULEURS";
import MarqueInfluence from "../../domain/entity/MarqueInfluence";
import Parchemin from "../../domain/entity/Parchemin";
import GenererUnNombreAleatoire from "../generateur/GenererUnNombreAleatoire";

type propsChevalier = { monstres: MONSTRES[], marqueurs: MarqueInfluence[] }
type propsFermier = { poulets: number[], marchandises: Marchandise[] }
type propsCommercant = {
    salpetre: number,
    souffre: number,
    fer: number,
    bois: number,
    nourriture: number
}

@Injectable()
export default class GuildMemory implements GuildRepository {

    constructor(private readonly genererUnNombreAleatoire: GenererUnNombreAleatoire) {
    }

    initialiser(): Promise<Guild[]> {
        const monstreEtMarqueurInfluence = this.initChevalier();
        const propsFermier = this.initFermier();
        const initCommercant = this.initCommercant();
        return Promise.resolve([
            new Alchimiste(this.initAlchimiste()),
            new Chevalier(monstreEtMarqueurInfluence.monstres, monstreEtMarqueurInfluence.marqueurs),
            new Noble(this.initNoble()),
            new Moine(this.initMoine()),
            new Fermier(propsFermier.poulets, propsFermier.marchandises),
            new Commercant(initCommercant.salpetre,initCommercant.souffre,
                initCommercant.fer,
                initCommercant.bois, initCommercant.nourriture)
        ]);
    }

    private initAlchimiste(): Galerie[] {
        return [
            {
                produit: PRODUITS.BATEAU,
                prix: [
                    MarchandiseFactory({type: MARCHANDISES.BOIS, quantite: 2}),
                    MarchandiseFactory({type: MARCHANDISES.NOURRITURE, quantite: 1})
                ]
            },
            {
                produit: PRODUITS.SOUS_MARIN,
                prix: [
                    MarchandiseFactory({type: MARCHANDISES.FER, quantite: 2}),
                    MarchandiseFactory({type: MARCHANDISES.NOURRITURE, quantite: 1})
                ]
            },
            {
                produit: PRODUITS.AERONEPHE,
                prix: [
                    MarchandiseFactory({type: MARCHANDISES.FER, quantite: 1}),
                    MarchandiseFactory({type: MARCHANDISES.NOURRITURE, quantite: 1}),
                    MarchandiseFactory({type: MARCHANDISES.BOIS, quantite: 1})
                ]
            },
            {
                produit: PRODUITS.KRUK,
                prix: [
                    MarchandiseFactory({type: MARCHANDISES.SALPETRE, quantite: 2}),
                    MarchandiseFactory({type: MARCHANDISES.SOUFFRE, quantite: 1})
                ]
            },
            {
                produit: PRODUITS.KRUK,
                prix: [
                    MarchandiseFactory({type: MARCHANDISES.SALPETRE, quantite: 1}),
                    MarchandiseFactory({type: MARCHANDISES.SOUFFRE, quantite: 1})
                ]
            },
            {
                produit: PRODUITS.KRUK,
                prix: [MarchandiseFactory({type: MARCHANDISES.BOIS, quantite: 1})]
            }
        ]
    }

    private initChevalier(): propsChevalier {
        const result: propsChevalier = {} as propsChevalier
        result.monstres = Object.values(MONSTRES).map(val => MONSTRES[val])
        result.marqueurs = Object.values(COULEURS)
            .map(couleur => new MarqueInfluence({
                couleur: COULEURS[couleur],
                quantite: 2
            }))

        return result
    }

    private initNoble(): Parchemin[] {
        return [new Parchemin(1, true),
            new Parchemin(2),
            new Parchemin(3, true),
            new Parchemin(4),
            new Parchemin(5, true),
            new Parchemin(6, true)]
    }

    private initMoine(): number[] {
        return [this.genererUnNombreAleatoire.execute(2, 5), this.genererUnNombreAleatoire.execute(2, 5)]
    }

    private initFermier(): propsFermier {
        const propsFermiers = {} as propsFermier
        propsFermiers.poulets = [this.genererUnNombreAleatoire.execute(2, 5)]
        propsFermiers.marchandises = [MarchandiseFactory({type: MARCHANDISES.NOURRITURE, quantite: 1})]
        return propsFermiers
    }

    private initCommercant(): propsCommercant {
        const propCommercant = {} as propsCommercant
        propCommercant.salpetre = 3
        propCommercant.souffre = 3
        propCommercant.fer = 5
        propCommercant.bois = 5
        propCommercant.nourriture = 5
        return propCommercant
    }

}
