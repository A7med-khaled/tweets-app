import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {
  @Input() tweet: any;
  toggleRepliesShow: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
