import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityProgressComponent } from './activity-progress.component';

describe('ToActivityComponent', () => {
  let component: ActivityProgressComponent;
  let fixture: ComponentFixture<ActivityProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityProgressComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
