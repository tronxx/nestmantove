import { Test, TestingModule } from '@nestjs/testing';
import { SeriesinvenController } from './seriesinven.controller';

describe('SeriesinvenController', () => {
  let controller: SeriesinvenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeriesinvenController],
    }).compile();

    controller = module.get<SeriesinvenController>(SeriesinvenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
