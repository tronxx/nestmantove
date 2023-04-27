import { Test, TestingModule } from '@nestjs/testing';
import { CombustService } from './combust.service';

describe('CombustService', () => {
  let service: CombustService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombustService],
    }).compile();

    service = module.get<CombustService>(CombustService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
