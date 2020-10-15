import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../../models/User';
import { AuthService } from '../../services/authorization/authService/auth.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  isAdmin: boolean;
  isUpdateUsers: boolean;
  isUpdateActivities: boolean;
  connectedUser: string;
  user: User;

  content = 'האם ברצונך להתנתק מכלל המכשירים?';
  showConfirmBox = false;
  showSpinner = false;

  constructor(private userService: UsersService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = this.isUpdateUsers = this.isUpdateActivities = false;

    this.userService.getUser().subscribe(
      (data: User) => {
        // console.log(data);
        this.user = data;
        this.connectedUser = this.user.email;

        if (this.user.role === 'מנהל מחלקה') {
          this.isAdmin = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showUsers() {
    if (this.isUpdateActivities) {
      this.isUpdateActivities = !this.isUpdateActivities;
    }
    this.isUpdateUsers = !this.isUpdateUsers;
  }

  showActivities() {
    if (this.isUpdateUsers) {
      this.isUpdateUsers = !this.isUpdateUsers;
    }
    this.isUpdateActivities = !this.isUpdateActivities;
  }

  logoutAll() {
    this.showConfirmBox = !this.showConfirmBox;
  }

  // Handle Confirm Box Dialog User Answer
  handleUserAnswer(userAnswer) {
    if (!userAnswer) {
      this.showConfirmBox = !this.showConfirmBox;
    } else {
      this.showConfirmBox = !this.showConfirmBox;
      this.showSpinner = !this.showSpinner;
      setTimeout(() => {
        this.authService.logoutAll().subscribe(
          (data) => {
            // console.log(data);
            console.log('check');
            this.authService.clearLocalStorage();
            this.router.navigate(['/']);
            this.showSpinner = !this.showSpinner;
          },
          (error) => {
            console.log(error);
          }
        );
      }, 3000);
    }
  }
}
