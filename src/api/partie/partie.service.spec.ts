import {Test, TestingModule} from '@nestjs/testing';
import {PartieService} from './partie.service';
import providerPlateauMemoryTest from "../../../test/mock/plateau/PlateauMemoryTest";
import providerGuildMemoryTest from "../../../test/mock/guild/GuildMemoryTest";
import providerCaseMemoryTest from "../../../test/mock/case/CaseMemoryTest";
import providerGenerateurUUIDMemoryTest from "../../../test/mock/generateur/GenerateurUUIDMemoryTest";
import providerPartieMemoryTest from "../../../test/mock/partie/PartieMemoryTest";
import providerJoueurMemoryTest from "../../../test/mock/joueur/JoueurMemoryTest";
import providerGenererUnNombreAleatoireTest from "../../../test/mock/generateur/GenererUnNombreAleatoireTest";

describe('PartieService', () => {
    let service: PartieService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PartieService, providerGenererUnNombreAleatoireTest, providerPartieMemoryTest, providerPlateauMemoryTest, providerGuildMemoryTest, providerCaseMemoryTest, providerGenerateurUUIDMemoryTest, providerJoueurMemoryTest],
        }).compile();

        service = module.get<PartieService>(PartieService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
