import { Injectable, Injector } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private Injector: Injector) {}

  intercept(req, next) {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.Injector.get(AuthService).getToken()}`,
      },
    });

    return next.handle(tokenizedReq);
  }
}
