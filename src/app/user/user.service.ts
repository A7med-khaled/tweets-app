import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { };


  getUserInfo() {
    return this.apollo.mutate({
      mutation: gql`
        query{
          whoami {
            id
            username
            followers {
              id
              username
            }
          }
        }`,
    }).pipe(map(({ data }) => {

      const res = data['whoami'];

      return res;

    }, (error) => {
      console.log('there was an error sending the query', error);
    }));
  }

}
