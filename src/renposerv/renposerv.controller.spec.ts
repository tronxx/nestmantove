import { Test, TestingModule } from '@nestjs/testing';
import { RenposervController } from './renposerv.controller';

describe('RenposervController', () => {
  let controller: RenposervController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenposervController],
    }).compile();

    controller = module.get<RenposervController>(RenposervController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
