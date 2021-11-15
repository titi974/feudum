import {Injectable} from '@nestjs/common';
import JoueurMemory from "../../infrastructure/memory/JoueurMemory";
import makeMigrer, {Migrer} from "../../domain/Migrer";
import JoueurRepository from "../../domain/port/JoueurRepository";
import JoueurId from "../../domain/valueObject/JoueurId";
import MigrerCommand from "../command/actions/MigrerCommand";
import Joueur from "../../domain/entity/joueur/Joueur";
import {GUILD_NOMS} from "../../domain/entity/guild/GUILD_NOMS";
import CaseId from "../../domain/valueObject/CaseId";
import PartieMemory from "../../infrastructure/memory/PartieMemory";

@Injectable()
export class JoueurService implements JoueurRepository {

    private readonly actionMigrer: Migrer;

    constructor(private readonly joueurMemory: JoueurMemory, partieMemory: PartieMemory) {
        this.actionMigrer = makeMigrer(this.joueurMemory, partieMemory);
    }

    async migrer(joueurId: string, migrerCommand: MigrerCommand) {
        await this.actionMigrer(GUILD_NOMS[migrerCommand.personnage], new JoueurId(joueurId), new CaseId(migrerCommand.caseId), migrerCommand.surPlateau)
    }

    getById(id: JoueurId): Promise<Joueur> {
        return this.joueurMemory.getById(id)
    }

    insert(joueur: Joueur): Promise<void> {
        return this.joueurMemory.insert(joueur)
    }
}
