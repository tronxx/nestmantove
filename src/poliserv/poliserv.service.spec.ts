import { Test, TestingModule } from '@nestjs/testing';
import { PoliservService } from './poliserv.service';

describe('PoliservService', () => {
  let service: PoliservService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliservService],
    }).compile();

    service = module.get<PoliservService>(PoliservService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
