import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  id: number;
  activity: Activity;
  generatedId: string;
  constructor() {}

  ngOnInit(): void {
    // get all activities
    // populate local value activities
    this.generatedId = this.generateId();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
