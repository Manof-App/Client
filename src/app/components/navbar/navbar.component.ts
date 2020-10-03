import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authorization/authService/auth.service';
import { UsersService } from '../../services/authorization/users/users.service';
import { FirebaseAuthService } from '../../services/authorization/firebaseAuth/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMenuCollapsed: boolean;
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  showSpinner: boolean;
  showConfirmBox: boolean;

  message: string;
  responseType: string;
  showServerMessage: boolean;

  content: string = 'האם ברצונך להתנתק?';

  constructor(
    private authService: AuthService,
    private firebaseAuth: FirebaseAuthService,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isMenuCollapsed = true;
    this.showSpinner = false;
    this.showConfirmBox = false;

    // this.firebaseAuth.getAuth().subscribe((auth) => {
    //   if (auth) {
    //     this.isLoggedIn = true;
    //     this.loggedInUser = auth.email;
    //   } else {
    //     this.isLoggedIn = false;
    //   }
    // });

    if (this.authService.loggedIn) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  onLogoutClick() {
    this.showConfirmBox = !this.showConfirmBox;
  }

  isAdmin() {
    // this.showServerMessage = false;
    // this.firebaseAuth.getAuth().subscribe((user) => {
    //   this.userService.getUser(user.email).subscribe((user) => {
    //     if (user.role === 'מנהל מפעל') {
    //       this.displayServerMessage('error', 'למנהל מפעל אין גישה לדף זה');
    //     } else {
    //       this.router.navigate(['/settings']);
    //     }
    //   }),
    //     (error) => {
    //       console.log(error);
    //     };
    // }),
    //   (error) => {
    //     console.log(error);
    //   };
  }

  handleUserAnswer(answer) {
    if (answer) {
      this.showConfirmBox = !this.showConfirmBox;
      this.showSpinner = !this.showSpinner;
      setTimeout(() => {
        this.authService.logout().subscribe(
          (data) => {
            console.log(data);

            this.authService.clearLocalStorage();
            this.router.navigate(['/']);
            this.showSpinner = !this.showSpinner;
          },
          (error) => {
            console.log(error);
          }
        );
      }, 3000);
    } else {
      this.showConfirmBox = !this.showConfirmBox;
    }
  }

  // Handle Server Message In Case Of Error Or Success
  displayServerMessage(resType: string, msg: string) {
    this.responseType = resType;
    this.message = msg;
    this.showServerMessage = !this.showServerMessage;
  }

  // handleUserAnswer(answer) {
  //   if (answer) {
  //     this.showConfirmBox = !this.showConfirmBox;
  //     this.showSpinner = !this.showSpinner;
  //     setTimeout(() => {
  //       this.authService.logout();
  //       this.router.navigate(['/']);
  //       this.showSpinner = !this.showSpinner;
  //     }, 3000);
  //   } else {
  //     this.showConfirmBox = !this.showConfirmBox;
  //   }
  // }
}
