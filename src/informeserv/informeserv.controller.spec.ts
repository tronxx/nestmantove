import { Test, TestingModule } from '@nestjs/testing';
import { InformeservController } from './informeserv.controller';

describe('InformeservController', () => {
  let controller: InformeservController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformeservController],
    }).compile();

    controller = module.get<InformeservController>(InformeservController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
