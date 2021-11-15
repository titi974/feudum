import DomainError from "../../DomainError";

export default class PionEpuiseError extends DomainError {
    constructor() {
        super("Plus de pion");
        this.name = 'PionEpuiseError'
    }
}
