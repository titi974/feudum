import Case from "../entity/case/Case";

export default interface CaseRepository {
    initialiser(): Promise<Case[]>
}
