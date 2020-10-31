import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { UserComponent } from './user.component';
import { SharedModule } from '../core/shared.module';



@NgModule({
  declarations: [
    UserCardComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserCardComponent,
    UserComponent,
  ]
})
export class UserModule { }
