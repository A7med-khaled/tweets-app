import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private userSubject: BehaviorSubject<any>;
  private tokenSubject: BehaviorSubject<string>;



  constructor(
    private router: Router,
    private apollo: Apollo,
  ) {
    this.userSubject = new BehaviorSubject<any>(localStorage.getItem('user'));
    this.tokenSubject = new BehaviorSubject<any>(localStorage.getItem('access_token'));
  }

  public get username(): any { return this.userSubject.value; }

  public get userToken(): any { return this.tokenSubject.value; }



  login(userCredentials) {

    const { username, password } = userCredentials
    return this.apollo.mutate({
      variables: { username, password },
      mutation: gql`
        mutation  login($username: String!,$password: String!) {
          login(username:$username,password:$password){
            username
            token
          }
        }`,
    }).pipe(
      map(({ data }) => {
        const res = data['login'];
        localStorage.setItem('user', res.username);
        this.userSubject.next(res.username);

        localStorage.setItem('access_token', res.token);
        this.tokenSubject.next(res.token);

        return res;

      }, (error) => {
        console.log('there was an error sending the query', error);
      }));
  }



  register(userCredentials) {

    const { username, password } = userCredentials
    return this.apollo.mutate({
      variables: { username, password },
      mutation: gql`
        mutation  register($username: String!,$password: String!) {
          register(username:$username,password:$password){
            username
            token
          }
        }`,
    }).pipe(map(({ data }) => {
      const res = data['register'];
      localStorage.setItem('user', res.username);
      this.userSubject.next(res.username);

      localStorage.setItem('access_token', res.token);
      this.tokenSubject.next(res.token);

      return res;

    }, (error) => {
      console.log('there was an error sending the query', error);
    }));
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
