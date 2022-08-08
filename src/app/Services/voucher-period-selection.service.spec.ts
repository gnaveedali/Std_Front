import { TestBed } from '@angular/core/testing';

import { VoucherPeriodSelectionService } from './voucher-period-selection.service';

describe('VoucherPeriodSelectionService', () => {
  let service: VoucherPeriodSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoucherPeriodSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
