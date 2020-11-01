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
    return this.apollo.watchQuery({
      fetchPolicy: "no-cache",
      query: gql`
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
    }).valueChanges
  }

  getUserToFollow() {
    return this.apollo.watchQuery({
      fetchPolicy: "no-cache",
      query: gql`
        query{
          getNotFollowed{
            id
            username
          }
        }`,
    }).valueChanges
  }


  followUser(id) {
    return this.apollo.mutate({
      variables: { id },
      mutation: gql`
        mutation  follow($id: ID!) {
          follow(followedId:$id)
        }`,
    })
  }

}
