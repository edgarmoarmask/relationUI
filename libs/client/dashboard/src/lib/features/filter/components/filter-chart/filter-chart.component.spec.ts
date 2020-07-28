import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterChartComponent } from './filter-chart.component';

describe('FilterChartComponent', () => {
  let component: FilterChartComponent;
  let fixture: ComponentFixture<FilterChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
