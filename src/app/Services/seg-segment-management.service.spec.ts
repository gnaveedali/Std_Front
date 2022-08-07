import { TestBed } from '@angular/core/testing';

import { SegSegmentManagementService } from './seg-segment-management.service';

describe('SegSegmentManagementService', () => {
  let service: SegSegmentManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SegSegmentManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
