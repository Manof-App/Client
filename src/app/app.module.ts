import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatDialogModule } from '@angular/material/dialog';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { OfficialsService } from './services/officials/officials.service';
import { UsersService } from './services/users/users.service';
import { ActivitiesService } from './services/activities/activities.service';
import { AuthService } from './services/authorization/authService/auth.service';
import { FirebaseAuthService } from './services/authorization/firebaseAuth/firebase-auth.service';
import { TokenInterceptorService } from './services/authorization/token-interceptor/token-interceptor.service';
import { HttpInterceptorService } from './services/authorization/http-interceptor/http-interceptor.service';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginRegisterPageComponent } from './components/login-register-page/login-register-page.component';

import { firebase_environment } from '../environments/environment';
import { ActivityCardsComponent } from './components/dashboard/activity-cards/activity-cards.component';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ManageUsersComponent } from './components/settings/manage-users/manage-users.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent,
    SettingsComponent,
    NotFoundComponent,
    DashboardComponent,
    LoginRegisterPageComponent,
    ActivityCardsComponent,
    ActivityDetailsComponent,
    ResetPasswordComponent,
    ManageUsersComponent,
    UsersComponent,
  ],
  entryComponents: [MatDialogModule],
  imports: [
    NgbModule,
    FormsModule,
    SharedModule,
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    MatGridListModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(firebase_environment.firebaseConfig),
  ],
  exports: [],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    UsersService,
    FirebaseAuthService,
    ActivitiesService,
    OfficialsService,
    AngularFireDatabase,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class AppModule {}
