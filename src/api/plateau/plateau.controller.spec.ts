import {Test, TestingModule} from '@nestjs/testing';
import {PlateauController} from './plateau.controller';
import {PlateauService} from "./plateau.service";

class PlateauServiceTest{

}
describe('Plateau Controller', () => {
    let controller: PlateauController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlateauController],
            providers: [{useClass: PlateauServiceTest, provide: PlateauService}]
        }).compile();

        controller = module.get<PlateauController>(PlateauController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
