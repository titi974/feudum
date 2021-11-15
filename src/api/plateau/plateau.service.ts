import {Injectable} from '@nestjs/common';
import Plateau from "../../domain/entity/plateau/Plateau";
import PlateauMemory from "../../infrastructure/memory/PlateauMemory";
import makeAfficherPlateau, {AfficherPlateau} from "../../domain/AfficherPlateau";
import PlateauRepository from "../../domain/port/PlateauRepository";
import PlateauId from "../../domain/valueObject/PlateauId";

@Injectable()
export class PlateauService implements PlateauRepository {
    private readonly afficherPlateau: AfficherPlateau;

    constructor(private readonly plateauMemory: PlateauMemory) {
        this.afficherPlateau = makeAfficherPlateau(plateauMemory);
    }

    get(plateauId: PlateauId): Promise<Plateau> {
        return this.plateauMemory.get(plateauId);
    }

    insert(plateau: Plateau): Promise<void> {
        return this.plateauMemory.insert(plateau)
    }
}
