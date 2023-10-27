import { TestBed } from '@angular/core/testing';

import { WeeksGeneratorService } from './weeks-generator.service';

describe('WeeksGeneratorService', () => {
  let service: WeeksGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeksGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
