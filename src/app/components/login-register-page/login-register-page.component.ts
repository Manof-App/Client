import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../../models/User';

import { AuthService } from '../../services/authorization/authService/auth.service';
import { UsersService } from '../../services/authorization/users/users.service';
import { FirebaseAuthService } from '../../services/authorization/firebaseAuth/firebase-auth.service';

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
    private userService: UsersService,
    private authService: AuthService,
    private firebaseAuthService: FirebaseAuthService
  ) {}

  // Component Life Cycle On Initialization
  ngOnInit(): void {
    this.initUser();
    this.initForms();
    this.initClassVariables();
  }

  // Variables Initialization
  initClassVariables() {
    this.showSpinner = this.showPassword = false;
  }

  // Forms Initialization
  initForms() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Validators.pattern('/.[a-zA-Z]{1}.*/')]
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', [Validators.required]],
    });
  }

  initUser() {
    this.user = {
      name: '',
      email: '',
      //role:''
    };
  }

  // Sign In Method
  submitLoginForm({ value }) {
    this.showServerMessage = false;
    this.showSpinner = !this.showSpinner;
    //   if (this.loginForm.valid) {
    //     this.firebaseAuthService
    //       .login(value.email, value.password)
    //       .then((res) => {
    //         setTimeout(() => {
    //           //console.log(res);
    //           this.showSpinner = !this.showSpinner;
    //           this.router.navigate(['/dashboard']);
    //         }, 3000);
    //       })
    //       .catch((err) => {
    //         setTimeout(() => {
    //           //console.log(err);
    //           this.displayServerMessage('error', 'משהו השתבש, נסה שוב בבקשה');
    //         }, 3000);
    //       });
    //   }

    setTimeout(() => {
      this.user.email = value.email;
      this.user.password = value.password;

      this.authService.login(this.user).subscribe(
        (data) => {
          this.authService.addToken(data);
          this.showSpinner = !this.showSpinner;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.displayServerMessage('error', 'משהו השתבש, נסה שוב בבקשה');
        }
      );
    }, 3000);
  }

  // Sign Up Method
  submitRegisterForm({ value }) {
    this.showServerMessage = false;
    this.showSpinner = !this.showSpinner;

    // this.user.email = value.email;
    // this.user.name = value.name;
    // this.user.role = 'מנהל מפעל';

    // setTimeout(() => {
    //   if (this.registerForm.valid) {
    //     this.firebaseAuthService
    //       .register(value.email, value.password)
    //       .then((res) => {
    //         //console.log(res);

    //         this.userService.addUserToFireBase(this.user);
    //         this.displayServerMessage('success', 'נרשמת בהצלחה!');
    //         this.registerActive = !this.registerActive;
    //       })
    //       .catch((err) => {
    //         //console.log(err);
    //         this.displayServerMessage('error', 'משהו השתבש, נסה שוב בבקשה');
    //       });
    //   }
    // }, 3000);

    setTimeout(() => {
      this.user.email = value.email;
      this.user.password = value.password;

      this.authService.register(this.user).subscribe(
        (data) => {
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
