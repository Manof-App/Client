import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from '../shared/dialog/dialog.component';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { environment, globals } from '../../environments/environment';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { ActivitiesComponent } from './activities/activities.component';
import { NeedsComponent } from './activities/manage-activity/needs/needs.component';
import { ActivityComponent } from './activities/manage-activity/activity/activity.component';
import { ManageActivityComponent } from './activities/manage-activity/manage-activity.component';
import { ActivityProgressComponent } from './activities/activity-progress/activity-progress.component';
import { OfficialComponent } from './activities/manage-activity/manage-officials/official/official.component';
import { ManageOfficialsComponent } from './activities/manage-activity/manage-officials/manage-officials.component';
import { AssignmentsComponent } from './activities/assignments/assignments.component';

@NgModule({
  declarations: [
    ActivitiesComponent,
    ManageActivityComponent,
    ActivityProgressComponent,
    ManageOfficialsComponent,
    DialogComponent,
    OfficialComponent,
    ActivityComponent,
    NeedsComponent,
    AssignmentsComponent,
  ],
  entryComponents: [DialogComponent],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ActivitiesRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: globals.googleMapsKey,
    }),
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export class ActivitiesModule {}
