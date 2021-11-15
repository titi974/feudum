import DomainError from "../entity/DomainError";

export default class MauvaisPionError extends DomainError {
    constructor() {
        super('Mauvais pion');
        this.name = 'MauvaisPionError'
    }
}
