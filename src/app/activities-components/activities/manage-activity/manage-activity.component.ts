import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActivitiesService } from '../../../services/activities/activities.service';
import { Activity } from 'src/app/models/Activity';
import { ActivityCardsComponent } from 'src/app/components/dashboard/activity-cards/activity-cards.component';

@Component({
  selector: 'app-manage-activity',
  templateUrl: './manage-activity.component.html',
  styleUrls: ['./manage-activity.component.css'],
})
export class ManageActivityComponent implements OnInit, OnDestroy {
  active: number;
  activity: Activity;
  id: string;
  constructor(private route: ActivatedRoute, private activitiesService: ActivitiesService) {}

  ngOnDestroy(): void {
    this.getActivity();
  }

  ngOnInit(): void {
    this.active = 1;
  }

  changeActivityTab(value) {
    this.active = value;
  }

  getCurrentId(value) {
    this.id = value;
  }

  getActivity() {
    this.activitiesService.getActivity(this.id).subscribe(
      (data: Activity) => {
        this.activity = data;
        this.deleteActivity();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteActivity() {
    if (this.activity.status === 'not_active') {
      this.activitiesService.deleteActivity(this.activity).subscribe(
        (data) => {
          // console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
