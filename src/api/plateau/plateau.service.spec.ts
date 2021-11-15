import {Test, TestingModule} from '@nestjs/testing';
import {PlateauService} from './plateau.service';
import PlateauMemory from "../../infrastructure/memory/PlateauMemory";
import PlateauMemoryTest from "../../../test/mock/plateau/PlateauMemoryTest";
import providerPlateauMemoryTest from "../../../test/mock/plateau/PlateauMemoryTest";

describe('PlateauService', () => {
    let service: PlateauService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlateauService, providerPlateauMemoryTest],
        }).compile();

        service = module.get<PlateauService>(PlateauService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
