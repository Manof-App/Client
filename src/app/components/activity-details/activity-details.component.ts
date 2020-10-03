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
  officials: Official;
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
    this.initObject();

    this.id = this.route.snapshot.queryParams.id;
    this.percentage = 0;

    // Get activity by id
    this.activitiesService.getActivity(this.id).subscribe(
      (data: Activity) => {
        this.activity = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.officialsService.getOfficialsPerActivity(this.id).subscribe((data) => {
      this.officials = data;
      this.handleOfficials();
    }),
      (error) => {
        console.log(error);
      };

    this.needService.getNeed(this.id).subscribe((data) => {
      this.needs = data;
    }),
      (error: any) => {
        console.log(error);
      };

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

  handleActivity() {
    const KEYS = Object.keys(this.activity);

    KEYS.forEach((obj: any) => {
      if (obj.includes('Date')) {
        this.activity[obj] = this.convertObjectToDate(this.activity[obj]);
      }
    });

    // this.activity.isScheduled = this.convertType(this.activity.isScheduled);
  }

  handleOfficials() {
    this.officials.activityOfficials.forEach((obj, index) => {
      let KEYS = Object.keys(this.officials.activityOfficials[index]);
      for (let key of KEYS) {
        if (key === 'requiredDate') {
          this.officials.activityOfficials[
            index
          ].requiredDate = this.convertObjectToDate(obj.requiredDate);
        }
      }
    });
  }

  // Initialize Class Objects
  initObject = () => {
    this.officials = {
      activityOfficials: [
        {
          id: '',
          activityId: '',
          job: '',
          jobTitle: '',
          requiredDate: new Date(),
          extraHoursNeeded: -1,
          managerApproval: false,
          managerDepartmentApproval: true,
          notes: '',
        },
      ],
    };

    this.needs = {
      id: '',
      activityId: '',
      isRequiredNotebookGuide: false,
      isRequiredGuideItems: false,
      detailedIGuideItems: '',
      isRequiredClothing: false,
      detailedClothing: '',
      isRequiredVehicles: false,

      isRequiredOfficeEquipment: false,
      isRequiredDepotEquipment: false,
      isRequiredFood: false,
      foodOrderingForm: false,
      foodType: false,
      foodDescription: '',

      isRequiredTransportation: false,
      isSitesAvailable: false,
      isSleepingArrangements: false,
      sleepingLocation: '',
      isRequiredBidingPrice: false,
      isRequiredExtraEquipment: false,
    };

    this.activityAssignments = {
      data: [
        {
          assignment: 'אין משימה',
          finalExecDate: new Date(),
          scheduleDate: new Date(),
          progress: 'טרם הסתיים',
        },
      ],
    };
  };

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

    this.activityAssignments.data.forEach((assignment, index) => {
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

  convertObjectToDate = (dateObj: Object): Date => {
    const KEYS = Object.keys(dateObj);
    let year, month, day;

    KEYS.forEach((key) => {
      if (key === 'year') {
        year = dateObj[key];
      } else if (key === 'month') {
        month = dateObj[key];
      } else {
        day = dateObj[key];
      }
    });

    return new Date(year, month - 1, day);
  };

  setTab(number) {
    this.globs.activityTab = number;
  }

  convertType(type: string): string {
    if (type === 'yes') return 'כן';
    return 'לא';
  }
}
