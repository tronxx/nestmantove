import { Test, TestingModule } from '@nestjs/testing';
import { RenposervService } from './renposerv.service';

describe('RenposervService', () => {
  let service: RenposervService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RenposervService],
    }).compile();

    service = module.get<RenposervService>(RenposervService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
