import { async, TestBed } from '@angular/core/testing';
import { InterceptorErrorModule } from './interceptor-error.module';

describe('InterceptorErrorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [InterceptorErrorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(InterceptorErrorModule).toBeDefined();
  });
});
