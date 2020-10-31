import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TweetsRoutingModule } from './tweets-routing.module';
import { TweetsComponent } from './tweets.component';
import { TweetCardComponent } from './tweet-card/tweet-card.component';
import { TweetFormComponent } from './tweet-form/tweet-form.component';
import { SharedModule } from '../core/shared.module';
import { UserModule } from '../user/user.module';
import { TweetsService } from './tweets.service';
import { ReplyFormComponent } from './reply-form/reply-form.component';


@NgModule({
  declarations: [TweetsComponent, TweetCardComponent, TweetFormComponent, ReplyFormComponent],
  imports: [
    CommonModule,
    TweetsRoutingModule,
    SharedModule,
    UserModule
  ],
  providers: [TweetsService]
})
export class TweetsModule { }
