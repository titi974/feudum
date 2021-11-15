import { Test, TestingModule } from '@nestjs/testing';
import { PartieController } from './partie.controller';
import providerPartieServiceTest from "../../../test/mock/partie/PartieServiceTest";

describe('Partie Controller', () => {
  let controller: PartieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartieController],
      providers: [providerPartieServiceTest]
    }).compile();

    controller = module.get<PartieController>(PartieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
