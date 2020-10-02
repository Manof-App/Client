import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-activity',
  templateUrl: './manage-activity.component.html',
  styleUrls: ['./manage-activity.component.css'],
})
export class ManageActivityComponent implements OnInit {
  active: number;

  constructor() {}

  ngOnInit(): void {
    this.active = 1;
  }

  onCompleteOfficials() {}

  onCompleteNeeds() {}

  changeActivityTab(value) {
    this.active = value;
  }
}
