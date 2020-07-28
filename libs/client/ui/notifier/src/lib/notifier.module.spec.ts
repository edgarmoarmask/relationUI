import { async, TestBed } from '@angular/core/testing';
import { NotifierModule } from './notifier.module';

describe('NotifierModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NotifierModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NotifierModule).toBeDefined();
  });
});
