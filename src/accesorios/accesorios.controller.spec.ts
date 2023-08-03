import { Test, TestingModule } from '@nestjs/testing';
import { AccesoriosController } from './accesorios.controller';

describe('AccesoriosController', () => {
  let controller: AccesoriosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccesoriosController],
    }).compile();

    controller = module.get<AccesoriosController>(AccesoriosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
