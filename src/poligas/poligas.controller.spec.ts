import { Test, TestingModule } from '@nestjs/testing';
import { PoligasController } from './poligas.controller';

describe('PoligasController', () => {
  let controller: PoligasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoligasController],
    }).compile();

    controller = module.get<PoligasController>(PoligasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
