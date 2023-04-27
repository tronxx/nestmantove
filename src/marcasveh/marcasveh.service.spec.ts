import { Test, TestingModule } from '@nestjs/testing';
import { MarcasvehService } from './marcasveh.service';

describe('MarcasvehService', () => {
  let service: MarcasvehService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarcasvehService],
    }).compile();

    service = module.get<MarcasvehService>(MarcasvehService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
