import { TestBed } from '@angular/core/testing';

import { DesignAccessGuard } from './design-access.guard';

describe('DesignAccessGuard', () => {
  let guard: DesignAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DesignAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
