import { Component, OnInit } from '@angular/core';
import { AlertService } from '../core/helper/alert.service';
import { TweetsService } from './tweets.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  tweets: any[];
  constructor(private tweetService: TweetsService, private alert: AlertService) { }

  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() {
    this.tweetService.getTweets()
      .subscribe({
        next: (tweets) => {
          console.log(tweets);
          this.tweets = tweets;
        },
        error: error => {
          this.alert.error(error);
        }
      });
  }
}