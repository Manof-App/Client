import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/authorization/firebaseAuth/firebase-auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  // Variables Declarations - Do Not Modified!
  resetPasswordForm: FormGroup;

  message: string;
  responseType: string;
  showSpinner: boolean;
  showServerMessage: boolean;
  // End Of Variables Declarations

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private authService: FirebaseAuthService
  ) {}

  // Component Life Cycle On Initialization
  ngOnInit(): void {
    this.initForms();
    this.showSpinner = false;
  }

  // Forms Initialization
  initForms() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Reset Password Method
  submitResetPasswordForm({ value }) {
    this.showServerMessage = false;
    this.showSpinner = !this.showSpinner;

    this.authService
      .resetPassword(value.email)
      .then(() => {
        setTimeout(() => {
          this.displayServerMessage('success', 'בדוק את חשבון המייל שלך');
        }, 3000);
      })
      .catch((error) => {
        setTimeout(() => {
          this.displayServerMessage(
            'error',
            'חשבון האימייל אשר הוזן אינו קיים'
          );
        }, 3000);
      });
  }

  // Handle Server Message In Case Of Error Or Success
  displayServerMessage(resType: string, msg: string) {
    this.showSpinner = !this.showSpinner;
    this.responseType = resType;
    this.message = msg;
    this.showServerMessage = !this.showServerMessage;
  }
}
