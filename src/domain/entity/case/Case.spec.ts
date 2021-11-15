import Case from "./Case";
import CaseId from "../../valueObject/CaseId";
import {LIEUX} from "./LIEUX";
import {REGIONS} from "../REGIONS";
import {PaysageFactory, PAYSAGES} from "./Paysage";

describe('Case', () => {
    let instance
    const caseId = new CaseId('1')
    const paysage = PaysageFactory(PAYSAGES.ARCHER)
    const region = REGIONS.TERRE_SAUVAGE
    beforeEach(()=>{
        instance = new Case(caseId, region, true, LIEUX.FIEF, paysage, 'N', []);
    })
    it('instance', () => {
        expect(instance).toBeDefined()
    })
})
