import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

    constructor( 
        private authService: AuthService, 
        private router: Router,
        private toastrService: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem("token");
    if(token){
      req = req.clone({
        url:  req.url,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === 401) {
            if(token) localStorage.removeItem("token");
            this.router.navigate(['signin']);
          }
          const err = error?.error?.message || error.statusText;
          this.toastrService.error(err, "OOPS");
            return throwError(err);                  
       })
    );
  }
}