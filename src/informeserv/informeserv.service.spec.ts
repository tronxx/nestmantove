import { Test, TestingModule } from '@nestjs/testing';
import { InformeservService } from './informeserv.service';

describe('InformeservService', () => {
  let service: InformeservService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformeservService],
    }).compile();

    service = module.get<InformeservService>(InformeservService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
