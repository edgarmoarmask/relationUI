import {async, TestBed} from '@angular/core/testing';
import {TrackByKeyModule} from './trackByKey.module';

describe('TrackByKeyModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TrackByKeyModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TrackByKeyModule).toBeDefined();
  });
});
