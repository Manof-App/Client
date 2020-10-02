import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivitiesComponent } from './activities/activities.component';
import { ManageActivityComponent } from './activities/manage-activity/manage-activity.component';

const routes: Routes = [
  { path: '', component: ActivitiesComponent },
  { path: 'manage-activity', component: ManageActivityComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class ActivitiesRoutingModule {}
