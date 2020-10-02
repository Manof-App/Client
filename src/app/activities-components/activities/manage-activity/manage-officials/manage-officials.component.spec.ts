import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOfficialsComponent } from './manage-officials.component';

describe('ActivityOfficialsComponent', () => {
  let component: ManageOfficialsComponent;
  let fixture: ComponentFixture<ManageOfficialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageOfficialsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOfficialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
