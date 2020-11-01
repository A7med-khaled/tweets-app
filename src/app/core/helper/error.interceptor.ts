import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';
import { AlertService } from './alert.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private alert: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.authService.userToken && this.authService.username) {
                // auto logout if 401 or 403 response returned from api
                this.authService.logout();
            }

            const error = err.message || err.error?.error || err.statusText;
            this.alert.error(error);
            return throwError(error);
        }))
    }
}