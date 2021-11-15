import {Module} from '@nestjs/common';
import {PlateauController} from "./plateau.controller";
import {PlateauService} from './plateau.service';
import GenerateurUUID from "../../infrastructure/generateur/GenerateurUUID";
import {MemoryModule} from "../../infrastructure/memory/memory.module";

@Module({
    imports: [MemoryModule],
    controllers: [PlateauController],
    providers: [PlateauService, GenerateurUUID],
    exports: [PlateauService]
})
export class PlateauModule {
}
