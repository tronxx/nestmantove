import { Test, TestingModule } from '@nestjs/testing';
import { InvenController } from './inven.controller';

describe('InvenController', () => {
  let controller: InvenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvenController],
    }).compile();

    controller = module.get<InvenController>(InvenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
