import JoueurRepository from "../../domain/port/JoueurRepository";
import JoueurId from "../../domain/valueObject/JoueurId";
import {Injectable} from "@nestjs/common";
import Joueur from "../../domain/entity/joueur/Joueur";

@Injectable()
export default class JoueurMemory implements JoueurRepository {
    private readonly memory: Map<string, Joueur> = new Map()
    getById(id: JoueurId): Promise<Joueur> {
        return Promise.resolve(this.memory.get(id.value));
    }

    insert(joueur: Joueur): Promise<void> {
        this.memory.set(joueur.id.value, joueur)
        return Promise.resolve();
    }

}
