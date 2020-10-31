import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable()
export class TweetsService {

  constructor(private apollo: Apollo) { }


  getTweets() {
    return this.apollo.query({
      query: gql`
        query{
          tweets {
            body
            id
            author{
              username
              id
            }
            replies{
              id
              body
            }
          }
        }`,
    }).pipe(map(({ data }) => {

      const res = data['tweets'];

      return res;

    }, (error) => {
      console.log('there was an error sending the query', error);
    }));
  }

  addTweet(body) {
    return this.apollo.mutate({
      variables: { body },
      mutation: gql`
      mutation  tweet($body: String!) {
        tweet(body:$body){
          id,
          body,
        }
      }`,
    }).pipe(map(({ data }) => {

      const res = data['tweet'];

      return res;

    }, (error) => {
      console.log('there was an error sending the query', error);
    }));
  }

  addReply(reply) {
    return this.apollo.mutate({
      variables: { ...reply },
      mutation: gql`
      mutation  createReply($tweet: ID!,$body: String!) {
        createReply(tweet:$tweet , body:$body){
          id,
          body,
        }
      }`,
    }).pipe(map(({ data }) => {

      const res = data['createReply'];

      return res;

    }, (error) => {
      console.log('there was an error sending the query', error);
    }));
  }
}

