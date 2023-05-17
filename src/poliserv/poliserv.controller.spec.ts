import { Test, TestingModule } from '@nestjs/testing';
import { PoliservController } from './poliserv.controller';

describe('PoliservController', () => {
  let controller: PoliservController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliservController],
    }).compile();

    controller = module.get<PoliservController>(PoliservController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
