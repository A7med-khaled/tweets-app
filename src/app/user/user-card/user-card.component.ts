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

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alert: AlertService
  ) {
    this.getInfo();
  }

  ngOnInit(): void {
  }

  getInfo() {
    this.userService
      .getUserInfo()
      .pipe(first())
      .subscribe({
        next: (user) => {
          this.userInfo = user;
          console.log(user);
        },
        error: error => {
          this.alert.error(error);
        }
      });
  }

  logoutHandler() {
    this.authService.logout();
  }
}
