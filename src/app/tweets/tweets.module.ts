import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TweetsRoutingModule } from './tweets-routing.module';
import { TweetsComponent } from './tweets.component';
import { TweetCardComponent } from './tweet-card/tweet-card.component';
import { TweetFormComponent } from './tweet-form/tweet-form.component';
import { SharedModule } from '../core/shared.module';
import { UserModule } from '../user/user.module';


@NgModule({
  declarations: [TweetsComponent, TweetCardComponent, TweetFormComponent],
  imports: [
    CommonModule,
    TweetsRoutingModule,
    SharedModule,
    UserModule
  ]
})
export class TweetsModule { }
