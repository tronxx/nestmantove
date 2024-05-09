import { Test, TestingModule } from '@nestjs/testing';
import { ImprikardexController } from './imprikardex.controller';

describe('ImprikardexController', () => {
  let controller: ImprikardexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImprikardexController],
    }).compile();

    controller = module.get<ImprikardexController>(ImprikardexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
