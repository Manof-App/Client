import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Activity } from '../../../models/activity';
import { Assignment } from '../../../models/Assignment';
import { ActivityEditing } from '../../../models/ActivityEditing';

import { AssignmentsService } from '../../../services/assignments/assignments.service';
import { ActivitiesService } from '../../../services/activities/activities.service';

@Component({
  selector: 'app-activity-progress',
  templateUrl: './activity-progress.component.html',
  styleUrls: ['./activity-progress.component.css'],
})
export class ActivityProgressComponent implements OnInit {
  activities: Activity[];
  assignments: Assignment[];
  percentage: number;

  editable: ActivityEditing = {
    isEditAndCreate: false,
  };

  constructor(private route: ActivatedRoute, private activityService: ActivitiesService, private assignmentService: AssignmentsService) {}

  ngOnInit(): void {
    this.percentage = 0;
    this.editable.isEditAndCreate = true;
    this.activityService.setEditingStates(this.editable);

    this.getActivities();
  }

  getActivities() {
    this.activityService.getActivities().subscribe(
      (data: Activity[]) => {
        // console.log(data);
        this.activities = data;

        this.activities.forEach((activity) => {
          this.getAssignments(activity._id);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAssignments(activityId: string) {
    this.assignmentService.getAssignments(activityId).subscribe(
      (data: Assignment[]) => {
        this.activities.forEach((activity) => {
          if (activity._id === activityId) {
            this.assignments = data;
            this.percentage = this.updateProgressBar();
            activity.percentage = this.percentage;
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateProgressBar(): number {
    let counter = 0;

    this.assignments.forEach((assignment) => {
      if (assignment.progress === 'טרם הסתיים') {
        counter += 1;
      } else if (assignment.progress === 'ממתין לאישור מנהל') {
        counter += 2;
      } else if (assignment.progress === 'נקבע תאריך גג לביצוע') {
        counter += 3;
      } else if (assignment.progress === 'הסתיים') {
        counter += 4;
      }
    });

    return (counter / (4 * 32)) * 100;
  }
}
