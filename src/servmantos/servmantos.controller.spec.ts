import { Test, TestingModule } from '@nestjs/testing';
import { ServmantosController } from './servmantos.controller';

describe('ServmantosController', () => {
  let controller: ServmantosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServmantosController],
    }).compile();

    controller = module.get<ServmantosController>(ServmantosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
