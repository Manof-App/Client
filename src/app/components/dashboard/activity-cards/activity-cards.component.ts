import { Component, OnInit } from '@angular/core';
import { Activity } from '../../../models/Activity';

import { ActivitiesService } from '../../../services/activities/activities.service';

@Component({
  selector: 'app-activity-cards',
  templateUrl: './activity-cards.component.html',
  styleUrls: ['./activity-cards.component.css'],
})
export class ActivityCardsComponent implements OnInit {
  activities: Activity[];

  key_finder: any = {
    startDate: 'תאריך התחלה',
    endDate: 'תאריך סיום',
    isApproved: 'ממתין לאישור',
  };

  constructor(private activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    // this.activitiesService.getActivities().subscribe((activities) => {
    //   this.activities = activities;
    // });

    this.activities = [];

    this.activitiesService.getAllActivities().subscribe((data) => {
      this.activities = data;
    });
  }

  myChange(event) {
    let finder = Object.keys(this.key_finder);

    finder.forEach((key) => {
      if (this.key_finder[key] === event.target.value) {
        this.activitiesService.getActivitiesByCategoryState(key, 'asc').subscribe(
          (data: Activity[]) => {
            this.activities = data;
          },
          (error) => {}
        );
      }
    });
  }
}
