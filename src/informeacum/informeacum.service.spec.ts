import { Test, TestingModule } from '@nestjs/testing';
import { InformeacumService } from './informeacum.service';

describe('InformeacumService', () => {
  let service: InformeacumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformeacumService],
    }).compile();

    service = module.get<InformeacumService>(InformeacumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
