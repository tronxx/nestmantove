import { Test, TestingModule } from '@nestjs/testing';
import { RenpogasController } from './renpogas.controller';

describe('RenpogasController', () => {
  let controller: RenpogasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenpogasController],
    }).compile();

    controller = module.get<RenpogasController>(RenpogasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
