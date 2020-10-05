import { Component, OnInit } from '@angular/core';

import { User } from '../../models/User';
import { UsersService } from '../../services/users/users.service';

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

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.isAdmin = this.isUpdateUsers = false;

    this.userService.getUser().subscribe(
      (data: User) => {
        //console.log(data)
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
}
