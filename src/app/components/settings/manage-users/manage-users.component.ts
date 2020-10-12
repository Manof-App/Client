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

  index = 0;
  content = 'האם אתה בטוח שאתה רוצה למחוק?';
  showConfirmBox = false;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.initUser();
    this.getUsers();
  }

  initUser() {
    this.user = {
      role: '',
    };
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        // console.log(data);
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
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

  deleteUser(e, i) {
    this.index = i;
    this.showConfirmBox = !this.showConfirmBox;
  }

  // Handle Confirm Box Dialog User Answer
  handleUserAnswer(userAnswer) {
    if (!userAnswer) {
      this.showConfirmBox = !this.showConfirmBox;
    } else {
      this.users.forEach((user, i) => {
        if (this.index === i) {
          if (this.connectedUser !== user.email) {
            // display user message

            this.userService.deleteUser(user).subscribe((data: void) => {
              console.log(data);
              this.showConfirmBox = !this.showConfirmBox;
              this.getUsers();
            });
          } else {
            console.log('check');
            // display user message
          }
        }
      });
    }
  }
}
