import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRelationsComponent } from './profile-relations.component';

describe('ProfileRelationsComponent', () => {
  let component: ProfileRelationsComponent;
  let fixture: ComponentFixture<ProfileRelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
