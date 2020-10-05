import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models/User';
import { AuthService } from '../../services/authorization/authService/auth.service';

@Component({
  selector: 'app-login-register-page',
  templateUrl: './login-register-page.component.html',
  styleUrls: ['./login-register-page.component.css'],
})
export class LoginRegisterPageComponent implements OnInit {
  // Variables Declarations - Do Not Modified!
  loginForm: FormGroup;
  registerForm: FormGroup;

  user: User;
  email: string;
  message: string;
  password: string;
  showPassword: boolean;

  responseType: string;
  showSpinner: boolean;
  registerActive: boolean;
  showServerMessage: boolean;
  // End Of Variables Declarations

  // Constructor
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  // Component Life Cycle On Initialization
  ngOnInit(): void {
    this.showSpinner = this.showPassword = false;

    this.initForms();
  }

  // Forms Initialization
  initForms() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Sign In Method
  submitLoginForm({ value }) {
    this.showServerMessage = false;
    this.showSpinner = !this.showSpinner;

    setTimeout(() => {
      this.user.email = value.email;
      this.user.password = value.password;

      this.authService.login(this.user).subscribe(
        (data) => {
          // console.log(data)
          this.authService.addToken(data);
          this.showSpinner = !this.showSpinner;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // console.log(error)
          this.displayServerMessage('error', 'משהו השתבש, נסה שוב בבקשה');
        }
      );
    }, 3000);
  }

  // Sign Up Method
  submitRegisterForm({ value }) {
    this.showServerMessage = false;
    this.showSpinner = !this.showSpinner;

    setTimeout(() => {
      this.user.email = value.email;
      this.user.password = value.password;
      this.user.role = 'מנהל מפעל';

      this.authService.register(this.user).subscribe(
        (data: User) => {
          this.authService.addToken(data);

          this.loginForm.controls.email.setValue(this.user.email);
          this.loginForm.controls.password.setValue(this.user.password);

          this.displayServerMessage('success', 'נרשמת בהצלחה!');

          this.showPassword = !this.showPassword;
          this.registerActive = !this.registerActive;
        },
        (error) => {
          console.log(error);
          this.displayServerMessage('error', 'משהו השתבש, נסה שוב בבקשה');
        }
      );
    }, 3000);
  }

  // Handle Server Message In Case Of Error Or Success
  displayServerMessage(resType: string, msg: string) {
    this.showSpinner = !this.showSpinner;
    this.responseType = resType;
    this.message = msg;
    this.showServerMessage = !this.showServerMessage;
  }

  // Resets Forms
  toggleRegisterForm() {
    this.showPassword = false;
    this.registerActive = !this.registerActive;
    this.loginForm.reset();
    this.registerForm.reset();
  }
}
