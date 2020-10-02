import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActivityComponent } from './manage-activity.component';

describe('ActivityComponent', () => {
  let component: ManageActivityComponent;
  let fixture: ComponentFixture<ManageActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageActivityComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
