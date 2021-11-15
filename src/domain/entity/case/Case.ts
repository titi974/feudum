import {LIEUX} from "./LIEUX";
import {REGIONS} from "../REGIONS";
import Paysage from "./Paysage";
import Entity from "../../Entity";
import Personnage from "../../valueObject/Personnage";
import CaseId from "../../valueObject/CaseId";
import {Optional} from "@eastbanctech/ts-optional";
import MigrationSansPionError from "../../error/MigrationSansPionError";


export default class Case implements Entity<Case> {


    constructor(public readonly id: CaseId, public readonly region: REGIONS,
                private readonly depart: boolean, private _lieu: LIEUX,
                private _paysage: Paysage, public readonly coordonne: string,
                public readonly personnages: Personnage[] = []) {
    }

    same(other: Case): boolean {
        return this.region === other.region && this.coordonne === other.coordonne
    }

    isDepart(): boolean {
        return this.depart
    }

    lieu(): LIEUX {
        return this._lieu
    }

    paysage(): Paysage {
        return this._paysage
    }

    ajouterPersonnage(personnage: Personnage) {
        if (!this.depart) {
            Optional.ofNullable(this.personnages.find(lePersonnage => lePersonnage.couleur === personnage.couleur))
                .orElseThrow(() => new MigrationSansPionError(personnage.couleur))
        }
        this.personnages.push(personnage)

    }

    retirerPersonnage(personnage: Personnage) {
        const index = this.personnages.findIndex(p => p.same(personnage));
        this.personnages.splice(index, 1)
    }
}

export const CaseFactory = (id: string, region: REGIONS, isDepart: boolean,
                            lieu: LIEUX, coordonne: string, paysage?: Paysage, personnage?: Personnage): Case => {
    const personnages = personnage ? [personnage] : []
    return new Case(new CaseId(id), region, isDepart, lieu, paysage, coordonne, personnages);
}
