import { Test, TestingModule } from '@nestjs/testing';
import { MarcasvehController } from './marcasveh.controller';

describe('MarcasvehController', () => {
  let controller: MarcasvehController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarcasvehController],
    }).compile();

    controller = module.get<MarcasvehController>(MarcasvehController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
