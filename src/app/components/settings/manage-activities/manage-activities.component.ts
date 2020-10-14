import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../../models/Activity';
import { ActivitiesService } from '../../../services/activities/activities.service';

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.css'],
})
export class ManageActivitiesComponent implements OnInit {
  activities: Activity[];
  activity: Activity;
  @Input() connectedUser: string;

  searchParams: HttpParams;
  index: number;
  message: string;
  responseType: string;
  content = 'האם אתה בטוח שאתה רוצה למחוק?';
  showServerMessage: boolean;
  showConfirmBox: boolean;

  constructor(private activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    this.initClassVariables();
    this.getActivities();
  }

  initClassVariables() {
    this.index = 0;
    this.showServerMessage = false;
    this.showConfirmBox = false;
  }

  getActivities() {
    // this.searchParams = new HttpParams().set('status', 'not_active').set()
    this.activitiesService.getActivities().subscribe(
      (data: Activity[]) => {
        this.activities = data;
        if (this.activities.length === 0) {
          this.displayServerMessage('error', 'לא קיימות פעילויות');
        }
        //console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeStatusState(activity: Activity) {
    if (activity.status === 'not_active') {
      activity.status = 'active';
    } else {
      activity.status = 'not_active';
    }

    this.updateActivity(activity);
  }

  changeApprovalState(activity: Activity) {
    if (activity.isApproved) {
      activity.isApproved = false;
    } else {
      activity.isApproved = true;
    }

    this.updateActivity(activity);
  }

  updateActivity(activity: Activity) {
    this.activitiesService.updateActivity(activity).subscribe(
      (data: Activity) => {
        console.log(data);
        this.getActivities();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Handle Server Message In Case Of Error Or Success
  displayServerMessage(resType: string, msg: string) {
    this.responseType = resType;
    this.message = msg;
    this.showServerMessage = !this.showServerMessage;
  }
}
