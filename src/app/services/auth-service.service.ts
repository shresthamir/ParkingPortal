import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  apiUrl: string
  public currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

  constructor(public http: HttpClient, public router: Router,) {
    this.apiUrl = environment.baseUrl
   }


   login(username: string, password: string) {
   return this.http.post<any>(`${this.apiUrl}/api/portalLogin`, { username, password });
}

changePassowrd(oldPassword: string, newPassword: string) {
  return this.http.post<any>(`${this.apiUrl}/api/changePassword`, { oldPassword, newPassword });
}

loggedIn() {
  return !!localStorage.getItem('ImsParkingToken');
}

}






export class User {
  id: number;
  username: string;
  password: string;
  token?: string;
}