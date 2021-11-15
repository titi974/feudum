import {Injectable} from '@nestjs/common';
import makeCreatePartie, {CreatePartie} from "../../domain/CreatePartie";
import GenerateurUUID from "../../infrastructure/generateur/GenerateurUUID";
import Partie from "../../domain/entity/Partie";
import PartieMemory from "../../infrastructure/memory/PartieMemory";
import PartieId from "../../domain/valueObject/PartieId";
import PartieRepository from "../../domain/port/PartieRepository";
import JoueurId from "../../domain/valueObject/JoueurId";
import JoueurMemory from "../../infrastructure/memory/JoueurMemory";
import CaseMemory from "../../infrastructure/memory/CaseMemory";
import GuildMemory from "../../infrastructure/memory/GuildMemory";
import PlateauMemory from "../../infrastructure/memory/PlateauMemory";
import GenererUnNombreAleatoire from "../../infrastructure/generateur/GenererUnNombreAleatoire";

@Injectable()
export class PartieService implements PartieRepository {
    private readonly createPartie: CreatePartie;

    constructor(private readonly partieMemory: PartieMemory, plateauMemory: PlateauMemory,
                guildMemory: GuildMemory, caseMemory: CaseMemory, generateurUUID: GenerateurUUID,
                joueurMemory: JoueurMemory) {
        this.createPartie = makeCreatePartie(this.partieMemory, generateurUUID, plateauMemory, caseMemory, guildMemory, joueurMemory);
    }

    async create(): Promise<string> {
        const partieId = await this.createPartie();
        return partieId.value
    }

    getById(id: PartieId): Promise<Partie> {
        return this.partieMemory.getById(id)
    }

    async insert(partie: Partie): Promise<void> {
        await this.partieMemory.insert(partie)
    }

    getByIdJoueur(id: JoueurId): Promise<Partie> {
        return this.partieMemory.getByIdJoueur(id);
    }
}
