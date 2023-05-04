import { Test, TestingModule } from '@nestjs/testing';
import { ServmantosService } from './servmantos.service';

describe('ServmantosService', () => {
  let service: ServmantosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServmantosService],
    }).compile();

    service = module.get<ServmantosService>(ServmantosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
