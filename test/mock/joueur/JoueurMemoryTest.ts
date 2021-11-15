import JoueurMemory from "../../../src/infrastructure/memory/JoueurMemory";
import JoueurRepository from "../../../src/domain/port/JoueurRepository";
import JoueurId from "../../../src/domain/valueObject/JoueurId";
import Joueur from "../../../src/domain/entity/joueur/Joueur";

class JoueurMemoryTest implements JoueurRepository{
    getById(id: JoueurId): Promise<Joueur> {
        return Promise.resolve(undefined);
    }

    insert(joueur: Joueur): Promise<void> {
        return Promise.resolve(undefined);
    }
}
const providerJoueurMemoryTest = {useClass: JoueurMemoryTest, provide: JoueurMemory}
export default providerJoueurMemoryTest
