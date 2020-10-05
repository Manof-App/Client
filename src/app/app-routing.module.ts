import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { UsersComponent } from './components/users/users.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';
import { LoginRegisterPageComponent } from './components/login-register-page/login-register-page.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginRegisterPageComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'activity-details',
        component: ActivityDetailsComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'activities',
        loadChildren: () =>
          import('./activities-components/activities.module').then(
            (m) => m.ActivitiesModule
          ),
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
