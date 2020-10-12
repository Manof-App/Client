import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { ActivityEditing } from '../../models/ActivityEditing';
import { Activity } from '../../models/Activity';
import { Official } from '../../models/Official';
import { Assignment } from '../../models/Assignment';

import { ActivitiesService } from '../../services/activities/activities.service';
import { OfficialsService } from '../../services/officials/officials.service';
import { NeedService } from '../../services/needs/needs.service';
import { AssignmentsService } from '../../services/assignments/assignments.service';

import { globals } from '../../../environments/environment';
import { Need } from 'src/app/models/Need';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],
  providers: [DatePipe],
})
export class ActivityDetailsComponent implements OnInit {
  active: number;
  id: string;

  globs = globals;
  percentage: number;

  activity: Activity;
  officials: Official[];
  assignments: Assignment[];

  needs: Need;

  showActivity: boolean;
  showNeeds: boolean;
  showOfficials: boolean;

  editable: ActivityEditing = {
    isOnlyEdit: false,
  };

  constructor(
    private route: ActivatedRoute,
    private activitiesService: ActivitiesService,
    private officialsService: OfficialsService,
    private needService: NeedService,
    private assignmentsService: AssignmentsService
  ) {}

  ngOnInit(): void {
    this.percentage = 0;
    this.id = this.route.snapshot.queryParams.id;
    this.editable.isOnlyEdit = true;
    this.activitiesService.setEditingStates(this.editable);

    this.showNeeds = false;

    // Get activity by id
    this.activitiesService.getActivity(this.id).subscribe(
      (data: Activity) => {
        // console.log(data);
        this.activity = data;
      },
      (error) => {
        console.log(error);
      }
    );

    // Get related officials
    this.officialsService.getOfficials(this.id).subscribe(
      (data: Official[]) => {
        // console.log(data);
        this.officials = data;
      },
      (error) => {
        console.log(error);
      }
    );

    // Get related needs
    this.needService.getNeed(this.id).subscribe(
      (data: Need) => {
        // console.log(data);
        this.needs = data;
      },
      (error) => {
        this.showNeeds = true;
        console.log(error);
      }
    );

    this.assignmentsService.getAssignments(this.id).subscribe(
      (data: Assignment[]) => {
        // console.log(data);
        this.assignments = data;
        this.updateProgressBar();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  myChange(e, i) {
    this.assignments.forEach((assignment, index) => {
      if (i === index) {
        assignment.progress = e.target.value;
      }
    });

    this.updateProgressBar();
  }

  updateProgressBar() {
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

    this.percentage = (counter / (4 * 32)) * 100;
  }

  setTab(num) {
    this.globs.activityTab = num;
  }
}
