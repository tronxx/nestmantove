import { Test, TestingModule } from '@nestjs/testing';
import { CiasedoctaService } from './ciasedocta.service';

describe('CiasedoctaService', () => {
  let service: CiasedoctaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiasedoctaService],
    }).compile();

    service = module.get<CiasedoctaService>(CiasedoctaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
