import {Module} from '@nestjs/common';
import CaseMemory from "./CaseMemory";
import GuildMemory from "./GuildMemory";
import JoueurMemory from "./JoueurMemory";
import PartieMemory from "./PartieMemory";
import PlateauMemory from "./PlateauMemory";
import GenererUnNombreAleatoire from "../generateur/GenererUnNombreAleatoire";

@Module({
    providers: [CaseMemory, GuildMemory, JoueurMemory, PartieMemory, PlateauMemory, GenererUnNombreAleatoire],
    exports: [CaseMemory, GuildMemory, JoueurMemory, PartieMemory, PlateauMemory]
})
export class MemoryModule {
}
