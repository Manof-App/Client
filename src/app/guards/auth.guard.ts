import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/authorization/authService/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  // canActivate(): Observable<boolean> {
  //   return this.afAuth.authState.pipe(
  //     map((auth) => {
  //       if (!auth) {
  //         this.router.navigate(['/']);
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     })
  //   );
  // }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
