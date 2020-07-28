import { async, TestBed } from '@angular/core/testing';
import { ProgressBarLoaderModule } from './progress-bar-loader.module';

describe('ProgressBarLoaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProgressBarLoaderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ProgressBarLoaderModule).toBeDefined();
  });
});
