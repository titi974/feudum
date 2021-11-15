import JoueurId from "../../../src/domain/valueObject/JoueurId";
import PartieRepository from "../../../src/domain/port/PartieRepository";
import PartieId from "../../../src/domain/valueObject/PartieId";
import Partie from "../../../src/domain/entity/Partie";
import PartieMemory from "../../../src/infrastructure/memory/PartieMemory";

class PartieMemoryTest implements PartieRepository{
    getById(id: PartieId): Promise<Partie> {
        return Promise.resolve(undefined);
    }

    getByIdJoueur(id: JoueurId): Promise<Partie> {
        return Promise.resolve(undefined);
    }

    insert(partie: Partie): Promise<void> {
        return Promise.resolve(undefined);
    }
}
const providerPartieMemoryTest = {useClass: PartieMemoryTest, provide: PartieMemory}
export default providerPartieMemoryTest
