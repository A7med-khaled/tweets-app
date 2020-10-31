import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/helper/alert.service';
import { TweetsService } from '../tweets.service';

@Component({
  selector: 'app-tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.scss']
})
export class TweetFormComponent implements OnInit {
  tweetForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private tweetService: TweetsService
  ) { }

  ngOnInit(): void {
    this.tweetForm = this.formBuilder.group({
      body: ['', [Validators.required]],
    });
  }

  get f() { return this.tweetForm.controls; }

  onSubmit() {

    // stop here if form is invalid
    if (this.tweetForm.invalid) {
      return;
    }

    const tweetData = {
      body: this.f.body.value,
    };

    this.tweetService.addTweet(tweetData.body)
      .subscribe({
        next: () => {
          this.alert.success('tweet added successfully');
          this.tweetForm.reset();
        },
        error: error => {
          this.alert.error(error);
        }
      });

  }
}
