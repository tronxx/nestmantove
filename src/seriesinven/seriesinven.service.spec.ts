import { Test, TestingModule } from '@nestjs/testing';
import { SeriesinvenService } from './seriesinven.service';

describe('SeriesinvenService', () => {
  let service: SeriesinvenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeriesinvenService],
    }).compile();

    service = module.get<SeriesinvenService>(SeriesinvenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
