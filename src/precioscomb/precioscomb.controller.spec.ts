import { Test, TestingModule } from '@nestjs/testing';
import { PrecioscombController } from './precioscomb.controller';

describe('PrecioscombController', () => {
  let controller: PrecioscombController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrecioscombController],
    }).compile();

    controller = module.get<PrecioscombController>(PrecioscombController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
