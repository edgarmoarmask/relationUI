import { async, TestBed } from '@angular/core/testing';
import { SpinnerLoaderModule } from './spinner-loader.module';

describe('SpinnerLoaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerLoaderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SpinnerLoaderModule).toBeDefined();
  });
});
