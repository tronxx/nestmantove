import { Test, TestingModule } from '@nestjs/testing';
import { PoligasService } from './poligas.service';

describe('PoligasService', () => {
  let service: PoligasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoligasService],
    }).compile();

    service = module.get<PoligasService>(PoligasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
