import { TestBed } from '@angular/core/testing';

import { BusinessUserAuthGuard } from './business-user-auth.guard';

describe('BusinessUserAuthGuard', () => {
  let guard: BusinessUserAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BusinessUserAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
