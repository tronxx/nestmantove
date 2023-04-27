import { Test, TestingModule } from '@nestjs/testing';
import { CombustController } from './combust.controller';

describe('CombustController', () => {
  let controller: CombustController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombustController],
    }).compile();

    controller = module.get<CombustController>(CombustController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
