import DomainError from "../../DomainError";

export default class ManqueNourritureError extends DomainError {
    constructor() {
        super('Manque de la nourriture');
    }
}
