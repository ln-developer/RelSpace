import { TestBed } from '@angular/core/testing';

import { ReleaseDataManagementService } from './release-data-management.service';

describe('ReleaseDataManagementService', () => {
  let service: ReleaseDataManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleaseDataManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
