import { Test, TestingModule } from '@nestjs/testing';
import { JoueurController } from './joueur.controller';
import providerJoueurServiceTest from "../../../test/mock/joueur/JoueurServiceTest";

describe('Joueur Controller', () => {
  let controller: JoueurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JoueurController],
      providers: [providerJoueurServiceTest]
    }).compile();

    controller = module.get<JoueurController>(JoueurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
