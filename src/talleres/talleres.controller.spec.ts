import { Test, TestingModule } from '@nestjs/testing';
import { TalleresController } from './talleres.controller';

describe('TalleresController', () => {
  let controller: TalleresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalleresController],
    }).compile();

    controller = module.get<TalleresController>(TalleresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
