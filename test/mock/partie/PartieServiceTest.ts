import PartieRepository from "../../../src/domain/port/PartieRepository";
import PartieId from "../../../src/domain/valueObject/PartieId";
import Partie from "../../../src/domain/entity/Partie";
import JoueurId from "../../../src/domain/valueObject/JoueurId";
import {PartieService} from "../../../src/api/partie/partie.service";

class PartieServiceTest implements PartieRepository {
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

const providerPartieServiceTest = {useClass: PartieServiceTest, provide: PartieService}
export default providerPartieServiceTest
