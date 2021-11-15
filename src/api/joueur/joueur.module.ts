import {forwardRef, Module} from '@nestjs/common';
import {JoueurService} from './joueur.service';
import {JoueurController} from './joueur.controller';
import JoueurMemory from "../../infrastructure/memory/JoueurMemory";
import {PartieModule} from "../partie/partie.module";
import PartieMemory from "../../infrastructure/memory/PartieMemory";

@Module({
    providers: [JoueurService, JoueurMemory, PartieMemory],
    exports: [JoueurService],
    controllers: [JoueurController]
})
export class JoueurModule {
}
