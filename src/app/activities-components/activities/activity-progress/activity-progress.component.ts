import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../../../models/activity';
import { ActivitiesService } from '../../../services/activities/activities.service';

@Component({
  selector: '[app-activity-progress]',
  templateUrl: './activity-progress.component.html',
  styleUrls: ['./activity-progress.component.css'],
})
export class ActivityProgressComponent implements OnInit {
  activities: Activity[];
  @Input() activityId;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivitiesService
  ) {}

  ngOnInit(): void {
    this.activityService.getActivities().subscribe((activities) => {
      this.activities = activities;
    });
  }
}
