import { TestBed } from '@angular/core/testing';

import { FinanceAccountService } from './finance-account.service';

describe('FinanceAccountService', () => {
  let service: FinanceAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
