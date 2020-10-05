import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showActivityOptions: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleActivity() {
    this.showActivityOptions = !this.showActivityOptions;
  }
}
