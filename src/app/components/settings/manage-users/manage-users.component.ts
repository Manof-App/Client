import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../../models/User';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  users: User[];
  user: User;
  @Input() connectedUser: string;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.initUser();

    this.userService.getUsers().subscribe(
      (data: User[]) => {
        //console.log(data);
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initUser() {
    this.user = {
      role: '',
    };
  }

  myChange(e, i) {
    this.users.forEach((user, index) => {
      if (i === index) {
        if (this.connectedUser != user.email) {
          // display user message
          this.user.role = e.target.value;
          this.userService.updateUser(user).subscribe((data: User) => {
            this.user = data;
          });
        } else {
          console.log('check');
          // display user message
        }
      }
    });
  }
}
