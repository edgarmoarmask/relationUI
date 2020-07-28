import {async, TestBed} from '@angular/core/testing';
import {SearchBoxModule} from './search-box.module';

describe('ClientUiSearchBoxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SearchBoxModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SearchBoxModule).toBeDefined();
  });
});
