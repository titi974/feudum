import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PlateauModule} from './api/plateau/plateau.module';
import {JoueurModule} from './api/joueur/joueur.module';
import {PartieModule} from './api/partie/partie.module';
import {MemoryModule} from './infrastructure/memory/memory.module';

@Module({
    imports: [MemoryModule, PartieModule, PlateauModule, JoueurModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
