import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphToolbarComponent } from './graph-toolbar.component';

describe('GraphToolbarComponent', () => {
  let component: GraphToolbarComponent;
  let fixture: ComponentFixture<GraphToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
