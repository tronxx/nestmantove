import { Test, TestingModule } from '@nestjs/testing';
import { CiasController } from './cias.controller';

describe('CiasController', () => {
  let controller: CiasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiasController],
    }).compile();

    controller = module.get<CiasController>(CiasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
