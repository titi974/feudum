import DomainError from "../entity/DomainError";

export default class MauvaiseCaseMigrerError extends DomainError {
    constructor(id: string) {
        super(`La case: ${id} n'est pas une case de départ`);
    }
}
