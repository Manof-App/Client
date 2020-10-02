import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../../models/User';
import { FirebaseAuthService } from '../../../services/authorization/firebaseAuth/firebase-auth.service';
import { UsersService } from '../../../services/authorization/users/users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  users: User[];
  @Input() connectedUser: string;

  constructor(
    private userService: UsersService,
    private fireBaseAuthService: FirebaseAuthService
  ) {}

  ngOnInit(): void {
    console.log(this.connectedUser);
    this.userService.getAllUsers().subscribe((data) => {
      //console.log(data);
      this.users = data;
    }),
      (error) => {
        console.log(error);
      };
  }

  myChange(e, i) {
    this.users.forEach((user, index) => {
      if (i === index) {
        if (this.connectedUser != user.email) {
          this.userService.updateUser(user, e.target.value);
          // display user message
        } else {
          // display user message
        }
      }
    });
  }
}
