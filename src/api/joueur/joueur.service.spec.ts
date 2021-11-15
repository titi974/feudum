import {Test, TestingModule} from '@nestjs/testing';
import {JoueurService} from './joueur.service';
import providerPartieMemoryTest from "../../../test/mock/partie/PartieMemoryTest";
import providerJoueurMemoryTest from "../../../test/mock/joueur/JoueurMemoryTest";

describe('JoueurService', () => {
    let service: JoueurService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [JoueurService, providerPartieMemoryTest, providerJoueurMemoryTest],
        }).compile();

        service = module.get<JoueurService>(JoueurService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
