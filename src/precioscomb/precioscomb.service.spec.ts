import { Test, TestingModule } from '@nestjs/testing';
import { PrecioscombService } from './precioscomb.service';

describe('PrecioscombService', () => {
  let service: PrecioscombService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrecioscombService],
    }).compile();

    service = module.get<PrecioscombService>(PrecioscombService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
