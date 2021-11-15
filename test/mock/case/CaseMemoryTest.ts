import CaseRepository from "../../../src/domain/port/CaseRepository";
import Case from "../../../src/domain/entity/case/Case";
import CaseMemory from "../../../src/infrastructure/memory/CaseMemory";


class CaseMemoryTest implements CaseRepository {
    initialiser(): Promise<Case[]> {
        return Promise.resolve([]);
    }
}

const providerCaseMemoryTest = {useClass: CaseMemoryTest, provide: CaseMemory}
export default providerCaseMemoryTest
