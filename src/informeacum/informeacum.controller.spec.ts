import { Test, TestingModule } from '@nestjs/testing';
import { InformeacumController } from './informeacum.controller';

describe('InformeacumController', () => {
  let controller: InformeacumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformeacumController],
    }).compile();

    controller = module.get<InformeacumController>(InformeacumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
