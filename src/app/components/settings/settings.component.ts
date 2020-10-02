import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../services/authorization/users/users.service';
import { FirebaseAuthService } from '../../services/authorization/firebaseAuth/firebase-auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  isAdmin: boolean;
  isUpdateUsers: boolean;
  connectedUser: string;
  user: User;

  constructor(
    private firebaseAuth: FirebaseAuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.initUser();
    this.isAdmin = this.isUpdateUsers = false;

    this.firebaseAuth.getAuth().subscribe((user) => {
      this.connectedUser = user.email;
      this.userService.getUser(user.email).subscribe((user) => {
        this.user = user;
        if (user.role === 'מנהל מחלקה') {
          this.isAdmin = true;
        }
      }),
        (error) => {
          console.log(error);
        };
    }),
      (error) => {
        console.log(error);
      };
  }

  initUser() {
    this.user = {
      name: '',
      email: '',
      role: '',
    };
  }
}
