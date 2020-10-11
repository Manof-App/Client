import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsersService } from '../../services/users/users.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  showForm: boolean;

  user: User;

  message: string;
  responseType: string;
  showServerMessage: boolean;

  constructor(private formBuilder: FormBuilder, private userService: UsersService) {}

  ngOnInit(): void {
    this.showForm = false;
    this.initializeUserForm();
    this.getUser();
  }

  // Forms Initialization
  initializeUserForm() {
    this.userForm = this.formBuilder.group({
      userId: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [],
      email: ['', [Validators.required, Validators.email]],
      address: [],
      phone: ['', Validators.required],
    });
  }

  updateUserForm() {
    this.userForm.controls.firstName.setValue(this.user.firstName);
    this.userForm.controls.lastName.setValue(this.user.lastName);
    this.userForm.controls.email.setValue(this.user.email);
    // this.userForm.controls.dateOfBirth.setValue(this.user.dateOfBirth);
    this.userForm.controls.address.setValue(this.user.address);
    this.userForm.controls.phone.setValue(this.user.phone);
  }

  getUser() {
    this.userService.getUser().subscribe(
      (data: User) => {
        this.user = data;
        this.updateUserForm();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitUserForm({ value }) {
    this.showServerMessage = false;

    this.user.firstName = value.firstName;
    this.user.lastName = value.lastName;
    this.user.email = value.email;
    this.user.dateOfBirth = new Date('1991/05/19');
    this.user.address = value.address;
    this.user.phone = value.phone;

    console.log(this.user.address);

    this.userService
      .updateUser({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        address: this.user.address,
        phone: this.user.phone,
      })
      .subscribe(
        (data: User) => {
          // console.log(data)
          this.user = data;
          this.displayServerMessage('success', 'עודכן בהצלחה');
        },
        (error) => {
          console.log(error);
          this.displayServerMessage('error', 'משהו השתבש, נסה שוב בבקשה');
        }
      );
  }

  // Handle Server Message In Case Of Error Or Success
  displayServerMessage(resType: string, msg: string) {
    this.responseType = resType;
    this.message = msg;
    this.showServerMessage = !this.showServerMessage;
  }
}
