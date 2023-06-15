import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, concatMap, Observable, of, throwError } from 'rxjs';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { SnackBarService } from './snack-bar.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router,
        private snackBarService:SnackBarService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = localStorage.getItem('ImsParkingToken');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + `${token}`,
                    'Content-Type': 'application/json',

                }
            });
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse, caught: Observable<any>) => {
                if (error && error.error && error.error.message) {
                    console.log(error);
                    const snackBarRef = this.snackBarService.openSnackBar(error.error.message);
                    return snackBarRef.onAction();
                }
                if (error.status === 401 || error.status === 403)
                    this.router.navigate(['/login']);
                //return of(new HttpResponse({ body: {}, status: 0 }));
                return throwError(() => error);
            })
        ) as any;
    }
}

