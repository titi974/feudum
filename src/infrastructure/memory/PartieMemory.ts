import {Injectable} from "@nestjs/common";
import PartieId from "../../domain/valueObject/PartieId";
import Partie from "../../domain/entity/Partie";
import PartieRepository from "../../domain/port/PartieRepository";
import JoueurId from "../../domain/valueObject/JoueurId";

@Injectable()
export default class PartieMemory implements PartieRepository {
    private readonly memory: Map<string, Partie> = new Map()
    getById(id: PartieId): Promise<Partie> {
        return Promise.resolve(this.memory.get(id.value));
    }

    insert(partie: Partie): Promise<void> {
        this.memory.set(partie.id.value, partie)
        return Promise.resolve();
    }

    getByIdJoueur(id: JoueurId): Promise<Partie> {
        const parties: Partie[] = Object.values(this.memory)

        for(const partie of parties){
            for(const joueur of partie.joueurs){
                if (joueur.id.same(id)){
                    return Promise.resolve(partie);
                }
            }
        }
        return Promise.reject("Aucune partie en cours");
    }

}
