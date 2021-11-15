import DomainError from "../entity/DomainError";

export default class MauvaiseCaseError extends DomainError{
    constructor(id: string) {
        super(`La case ${id} n'existe pas`);
    }
}
