import DomainError from "../entity/DomainError";

export default class MigrationSansPionError extends DomainError {
    constructor(couleur: string) {
        super(`Pas de pion de couleur ${couleur}`);
    }
}
