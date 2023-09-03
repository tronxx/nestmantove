import { Test, TestingModule } from '@nestjs/testing';
import { InformecombController } from './informecomb.controller';

describe('InformecombController', () => {
  let controller: InformecombController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformecombController],
    }).compile();

    controller = module.get<InformecombController>(InformecombController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
