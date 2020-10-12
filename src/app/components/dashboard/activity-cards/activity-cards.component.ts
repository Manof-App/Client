import { HttpParams } from '@angular/common/http';
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
  searchParams: HttpParams;

  hasNext: boolean;
  hasPrev: boolean;
  isShow: boolean;

  keyFinder: any = {
    startDate: 'תאריך התחלה',
    endDate: 'תאריך סיום',
    status: 'סטטוס',
    isApproved: 'ממתין לאישור',
  };

  options: any = {
    limit: '',
    skip: '',
  };

  listLength = -1;
  startIndex: any = -1;
  endIndex: any = -1;

  next: any = {
    page: 1,
    limit: 2,
  };

  previous: any = {
    page: -1,
    limit: 2,
  };

  constructor(private activitiesService: ActivitiesService) {}

  ngOnInit(): void {
    this.isShow = false;
    this.hasNext = this.hasPrev = true;
    this.activities = [];
    this.showResults();
  }

  showResults() {
    this.activitiesService.getActivitiesByCategoryState(this.searchParams).subscribe(
      (data: any) => {
        // console.log(data);
        if (data.results.length === 0) {
          this.isShow = !this.isShow;
          this.hasNext = this.hasPrev = false;
        } else {
          if (this.isShow) {
            this.isShow = !this.isShow;
          }

          this.next = data.next;
          this.previous = data.previous;
          this.startIndex = data.startIndex;
          this.endIndex = data.endIndex;
          this.listLength = data.length;
          this.activities = data.results;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Handle user sorting request
  myChange(value) {
    const finder = Object.keys(this.keyFinder);

    const keyValue = finder.filter((key) => this.keyFinder[key] === value)[0];

    this.utilityFunction(keyValue);
  }

  nextPage() {
    if (this.isShow) {
      this.isShow = !this.isShow;
      this.hasPrev = !this.hasPrev;
    } else if (this.endIndex < this.listLength) {
      this.searchParams = new HttpParams().set('page', `${this.next.page}`);
      this.showResults();
    } else {
      this.isShow = !this.isShow;
      this.hasNext = !this.hasNext;
    }
  }

  prevPage() {
    if (this.isShow) {
      this.isShow = !this.isShow;
      this.hasNext = !this.hasNext;
    } else if (this.startIndex > 0) {
      this.searchParams = new HttpParams().set('page', `${this.previous.page}`);
      this.showResults();
    } else {
      this.isShow = !this.isShow;
      this.hasPrev = !this.hasPrev;
    }
  }

  utilityFunction(key: string) {
    switch (key) {
      case 'startDate':
        {
          this.searchParams = new HttpParams().set('sortBy', 'startDate:asc');
        }
        break;

      case 'endDate':
        {
          this.searchParams = new HttpParams().set('sortBy', 'endDate:asc');
        }
        break;

      case 'isApproved':
        {
          this.searchParams = new HttpParams().set('isApproved', 'false');
        }
        break;
    }

    this.showResults();
  }
}
