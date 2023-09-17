import { Test, TestingModule } from '@nestjs/testing';
import { CiasedoctaController } from './ciasedocta.controller';

describe('CiasedoctaController', () => {
  let controller: CiasedoctaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiasedoctaController],
    }).compile();

    controller = module.get<CiasedoctaController>(CiasedoctaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
