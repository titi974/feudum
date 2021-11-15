import Plateau from "../../domain/entity/plateau/Plateau";
import PlateauRepository from "../../domain/port/PlateauRepository";
import PlateauId from "../../domain/valueObject/PlateauId";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class PlateauMemory implements PlateauRepository {
    private readonly memory: Map<string, Plateau> = new Map()

    insert(plateau: Plateau): Promise<any> {
        this.memory.set(plateau.id.value, plateau)
        return Promise.resolve();
    }

    get(plateauId: PlateauId): Promise<Plateau> {
        return Promise.resolve(this.memory.get(plateauId.value))
    }

}
