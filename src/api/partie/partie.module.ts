import {Module} from '@nestjs/common';
import {PartieController} from './partie.controller';
import {PartieService} from './partie.service';
import {PlateauModule} from "../plateau/plateau.module";
import GenerateurUUID from "../../infrastructure/generateur/GenerateurUUID";
import {MemoryModule} from "../../infrastructure/memory/memory.module";
import GenererUnNombreAleatoire from "../../infrastructure/generateur/GenererUnNombreAleatoire";

@Module({
    imports: [PlateauModule, MemoryModule],
    controllers: [PartieController],
    providers: [PartieService, GenerateurUUID, GenererUnNombreAleatoire]
})
export class PartieModule {
}
