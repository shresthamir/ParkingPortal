import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

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
            catchError((error: HttpErrorResponse) => {
                if (error && error.error && error.error.message)
                    alert(error.error.message);
                if (error.status === 401 || error.status === 403)
                    this.router.navigate(['/login']);
                return of(new HttpResponse({ body: {}, status: 0 }));
            })
        ) as any;
    }
}

