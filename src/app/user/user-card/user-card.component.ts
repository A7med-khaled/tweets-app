import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/Auth/auth.service';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/core/helper/alert.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  userInfo: any;
  showFollower: boolean = false;
  showFollowing: boolean = false;
  followingUsers: any[];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alert: AlertService
  ) {

  }

  ngOnInit(): void {
    this.getFollowing();
    this.getInfo();
  }

  getInfo() {
    this.userService.getUserInfo()
      .subscribe((data: any) => {
        this.userInfo = data.data.whoami;
      }, (error) => {
        this.alert.error(error);
      });
  }

  getFollowing() {
    this.userService.getFollowing()
      .subscribe((data: any) => {
        this.followingUsers = data.data.getFollowed;
      }, (error) => {
        this.alert.error(error);
      });
  }


  logoutHandler() {
    this.authService.logout();
  }
}
