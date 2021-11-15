import CaseRepository from "../../domain/port/CaseRepository";
import Case, {CaseFactory} from "../../domain/entity/case/Case";
import {Injectable} from "@nestjs/common";
import {LIEUX} from "../../domain/entity/case/LIEUX";
import {REGIONS} from "../../domain/entity/REGIONS";

@Injectable()
export default class CaseMemory implements CaseRepository {
    initialiser(): Promise<Case[]> {
        const cases: Case[] = []
        const lieux = (): string => {
            let unLieu
            do {
                unLieu = MakeGenerateur(LIEUX)
            } while (unLieu === 'FIEF')
            return unLieu
        }
        // PETITES_ILES
        // ("E", "SW", "N")
        cases.push(CaseFactory('1', REGIONS.PETITES_ILES, false, LIEUX[lieux()], 'E'))
        cases.push(CaseFactory('2', REGIONS.PETITES_ILES, false, LIEUX[lieux()], `SW`))
        cases.push(CaseFactory('3', REGIONS.PETITES_ILES, false, LIEUX[lieux()], 'N'))

        // GRANDES_ILES
        // ("O", "S", "N", "E")
        cases.push(CaseFactory('4', REGIONS.GRANDES_ILES, false, LIEUX[lieux()], 'W'))
        cases.push(CaseFactory('5', REGIONS.GRANDES_ILES, false, LIEUX[lieux()], 'S'))
        cases.push(CaseFactory('6', REGIONS.GRANDES_ILES, false, LIEUX[lieux()], 'N'))
        cases.push(CaseFactory('7', REGIONS.GRANDES_ILES, false, LIEUX[lieux()], 'E'))

        // FORET
        // ("NO", "SE", "N")
        cases.push(CaseFactory('8', REGIONS.FORETS, false, LIEUX[lieux()], 'E'))
        cases.push(CaseFactory('9', REGIONS.FORETS, false, LIEUX[lieux()], 'SW'))
        cases.push(CaseFactory('10', REGIONS.FORETS, false, LIEUX[lieux()], 'N'))

        // DESERT
        // ("E", "SW", "N", "SE", "NE")
        cases.push(CaseFactory('11', REGIONS.DESERT, false, LIEUX[lieux()], 'E'))
        cases.push(CaseFactory('12', REGIONS.DESERT, false, LIEUX[lieux()], 'SW'))
        cases.push(CaseFactory('13', REGIONS.DESERT, false, LIEUX[lieux()], 'N'))
        cases.push(CaseFactory('14', REGIONS.DESERT, false, LIEUX[lieux()], 'SE'))
        cases.push(CaseFactory('15', REGIONS.DESERT, false, LIEUX[lieux()], 'NE'))

        // MONTAGNE
        // ("NW", "SE", "N", "NE", "S")
        cases.push(CaseFactory('16', REGIONS.MONTAGNE, false, LIEUX[lieux()], 'SE'))
        cases.push(CaseFactory('17', REGIONS.MONTAGNE, false, LIEUX[lieux()], 'S'))
        cases.push(CaseFactory('18', REGIONS.MONTAGNE, false, LIEUX[lieux()], 'NE'))
        cases.push(CaseFactory('19', REGIONS.MONTAGNE, false, LIEUX[lieux()], 'N'))
        cases.push(CaseFactory('20', REGIONS.MONTAGNE, false, LIEUX[lieux()], 'NW'))

        // TERRES_SAUVAGES:
        // ("NW", "SE")
        cases.push(CaseFactory('21', REGIONS.TERRE_SAUVAGE, false, LIEUX[lieux()], 'SE'))
        cases.push(CaseFactory('22', REGIONS.TERRE_SAUVAGE, false, LIEUX[lieux()], 'NW'))

        return Promise.resolve(cases);
    }

}

const MakeGenerateur = <T>(ele: T) => (): T[keyof T] => {
    const min = 0
    const max = Object.keys(ele).length - 1
    const valeur = Math.floor(Math.random() * (max - min + 1)) + min
    const enumValue = Object.keys(ele).map(n => n) as unknown as T[keyof T][]
    return enumValue[valeur]
}
