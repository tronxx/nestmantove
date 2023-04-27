import { Test, TestingModule } from '@nestjs/testing';
import { CiasService } from './cias.service';

describe('CiasService', () => {
  let service: CiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiasService],
    }).compile();

    service = module.get<CiasService>(CiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
