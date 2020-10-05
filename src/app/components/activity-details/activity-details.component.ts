import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { Activity } from '../../models/Activity';
import { Official } from '../../models/Official';
import { ActivityAssignments } from '../../models/ActivityAssignments';

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
  needs: Need;
  activityAssignments: ActivityAssignments;

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

    // Get activity by id
    this.activitiesService.getActivity(this.id).subscribe(
      (data: Activity) => {
        //console.log(data);
        this.activity = data;
      },
      (error) => {
        console.log(error);
      }
    );

    // Get related officials
    this.officialsService.getOfficials(this.id).subscribe(
      (data: Official[]) => {
        //console.log(data);
        this.officials = data;
      },
      (error) => {
        console.log(error);
      }
    );

    // Get related needs
    this.needService.getNeed(this.id).subscribe(
      (data: Need) => {
        //console.log(data);
        this.needs = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.assignmentsService
      .getActivityAssignments(this.id)
      .subscribe((data) => {
        if (data != undefined) {
          this.activityAssignments = data;
        }
        this.updateProgressBar();
      }),
      (error: any) => {
        console.log(error);
      };
  }

  // Initialize Class Objects
  // initObject = () => {
  //   this.activityAssignments = {
  //     data: [
  //       {
  //         assignment: 'אין משימה',
  //         finalExecDate: new Date(),
  //         scheduleDate: new Date(),
  //         progress: 'טרם הסתיים',
  //       },
  //     ],
  //   };
  // };

  myChange(e, i) {
    this.activityAssignments.data.forEach((assignment, index) => {
      if (i == index) {
        assignment.progress = e.target.value;
      }
    });

    this.assignmentsService.saveAssignmentsToFireBase(
      this.id,
      this.activityAssignments
    );

    this.updateProgressBar();
  }

  updateProgressBar() {
    let counter = 0;

    // this.activityAssignments.data.forEach((assignment, index) => {
    //   if (assignment.progress === 'טרם הסתיים') {
    //     counter += 1;
    //   } else if (assignment.progress === 'ממתין לאישור מנהל') {
    //     counter += 2;
    //   } else if (assignment.progress === 'נקבע תאריך גג לביצוע') {
    //     counter += 3;
    //   } else if (assignment.progress === 'הסתיים') {
    //     counter += 4;
    //   }
    // });

    this.percentage = (counter / (4 * 32)) * 100;
  }

  setTab(number) {
    this.globs.activityTab = number;
  }
}
