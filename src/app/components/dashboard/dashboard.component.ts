import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ActivityEditing } from 'src/app/models/ActivityEditing';
import { ActivitiesService } from '../../services/activities/activities.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showActivityOptions: boolean;

  editable: ActivityEditing = {
    isEditAndCreate: false,
    isOnlyEdit: false,
  };

  constructor(private activitiesService: ActivitiesService, private router: Router) {}

  ngOnInit(): void {
    this.showActivityOptions = false;
  }

  toggleActivity() {
    this.showActivityOptions = !this.showActivityOptions;
  }

  createNewActivity() {
    this.editable.isEditAndCreate = true;
    this.activitiesService.setEditingStates(this.editable);

    this.router.navigate(['/activities/manage-activity']);
  }
}