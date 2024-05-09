import { Test, TestingModule } from '@nestjs/testing';
import { ImprikardexService } from './imprikardex.service';

describe('ImprikardexService', () => {
  let service: ImprikardexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImprikardexService],
    }).compile();

    service = module.get<ImprikardexService>(ImprikardexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
