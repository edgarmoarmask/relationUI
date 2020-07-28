import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOptionComponent } from './detail-option.component';

describe('DetailOptionComponent', () => {
  let component: DetailOptionComponent;
  let fixture: ComponentFixture<DetailOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
