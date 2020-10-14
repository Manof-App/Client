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

  message: string;
  responseType: string;
  showServerMessage: boolean;

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
        if (user.role !== 'מנהל מחלקה') {
          if (this.connectedUser !== user.email) {
            // display user message
            this.user.role = e.target.value;
            user.role = this.user.role;
            this.userService.updateUserRole(user).subscribe((data: User) => {
              this.user = data;
            }, (error) => {
              console.log(error);
              this.displayServerMessage('error', 'משהו השתבש, הפעולה לא התאפשרה');
            });
          } else {
            this.displayServerMessage('error', 'לא ניתן לשנות גישה לעצמך');
          }
        } else {
          this.displayServerMessage('error', 'לא ניתן לשנות גישה למשתמש בעל הרשאת מנהל מחלקה');
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
            if (user.role !== 'מנהל מחלקה') {
              this.userService.deleteUser(user).subscribe((data: void) => {
                console.log(data);
                this.showConfirmBox = !this.showConfirmBox;
                this.displayServerMessage('success', 'משתמש נמחק בהצלחה');
                this.getUsers();
              }, (error) => {
                console.log(error);
                this.showConfirmBox = !this.showConfirmBox;
                this.displayServerMessage('error', 'משהו השתבש, הפעולה לא התאפשרה');
              });
            } else {
              this.showConfirmBox = !this.showConfirmBox;
              this.displayServerMessage('error', 'לא ניתן למחוק משתמש בעל הרשאת מנהל מחלקה');
            }
          } else {
            this.showConfirmBox = !this.showConfirmBox;
            this.displayServerMessage('error', 'לא ניתן למחוק את עצמך');
          }
        }
      });
    }
  }

    // Handle Server Message In Case Of Error Or Success
    displayServerMessage(resType: string, msg: string) {
      this.responseType = resType;
      this.message = msg;
      this.showServerMessage = !this.showServerMessage;
    }
}
