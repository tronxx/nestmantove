import { Test, TestingModule } from '@nestjs/testing';
import { InformecombService } from './informecomb.service';

describe('InformecombService', () => {
  let service: InformecombService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformecombService],
    }).compile();

    service = module.get<InformecombService>(InformecombService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
