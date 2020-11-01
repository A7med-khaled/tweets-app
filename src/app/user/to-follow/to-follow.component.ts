import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/helper/alert.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-to-follow',
  templateUrl: './to-follow.component.html',
  styleUrls: ['./to-follow.component.scss']
})
export class ToFollowComponent implements OnInit {
  toFollowUsers: any[];
  constructor(
    private userService: UserService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUserToFollow()
      .subscribe((data: any) => {
        this.toFollowUsers = data.data.getNotFollowed;
      }, (error) => {
        this.alert.error(error);
      });
  }

  followUser(id) {
    this.userService.followUser(id)
      .subscribe((data) => {
        this.alert.success('user Followed');
        this.getUsers();
      }, (error) => {
        this.alert.error(error);
      });

  }

}


// next: (msg) => {
//   this.alert.success(msg);
//   this.getUsers();
// },
// error: error => {
//   this.alert.error(error);
// }
// }