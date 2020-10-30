import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  private tokenSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.tokenSubject = new BehaviorSubject<any>(localStorage.getItem('access_token'));
  }

  public get userValue(): any { return this.userSubject.value; }

  public get userToken(): any { return this.tokenSubject.value; }

  login(userCredentials, organization) {
    return this.http
      .post('http://localhost:3000/login/' + organization, userCredentials)
      .pipe(map((res: any) => {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.userSubject.next(res.data.user);

        localStorage.setItem('access_token', res.data.access_token);
        this.tokenSubject.next(res.data.access_token);

        return res.data;
      })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);

    localStorage.removeItem('access_token');
    this.tokenSubject.next(null);

    this.router.navigate(['/login']);
  }

}
