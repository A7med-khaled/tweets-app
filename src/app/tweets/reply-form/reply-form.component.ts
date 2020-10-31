import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/helper/alert.service';
import { TweetsService } from '../tweets.service';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.scss']
})
export class ReplyFormComponent implements OnInit {
  @Input() tweetId: Number;
  replyForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private tweetService: TweetsService
  ) { }

  ngOnInit(): void {
    console.log(this.tweetId);
    this.replyForm = this.formBuilder.group({
      body: ['', [Validators.required]],
    });
  }

  get f() { return this.replyForm.controls; }

  onSubmit() {

    // stop here if form is invalid
    if (this.replyForm.invalid) {
      return;
    }

    const replayData = {
      body: this.f.body.value,
      tweet: this.tweetId
    };

    console.log(replayData)
    this.tweetService.addReply(replayData)
      .subscribe({
        next: () => {
          this.alert.success('reply added successfully');
          this.replyForm.reset();
        },
        error: error => {
          this.alert.error(error);
        }
      });

  }
}
