import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {

  toggleRepliesShow: boolean = false;
  
  tweet = {
    body: 'this is my tweet text body',
    author: {
      id: 1,
      username: "ahmedkhald"
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
