import { Test, TestingModule } from '@nestjs/testing';
import { RenpogasService } from './renpogas.service';

describe('RenpogasService', () => {
  let service: RenpogasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RenpogasService],
    }).compile();

    service = module.get<RenpogasService>(RenpogasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
