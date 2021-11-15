import Command from "../Command";
import {GUILD_NOMS} from "../../../domain/entity/guild/GUILD_NOMS";

export default class MigrerCommand implements Command {
    public readonly caseId: string
    public readonly personnage: GUILD_NOMS
    public readonly surPlateau: boolean

    execute(): void {
    }
}
