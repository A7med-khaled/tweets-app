import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';
import { AlertService } from '../helper/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.generateForm();
  }

  get f() { return this.loginForm.controls; }

  generateForm() {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const userCredentials = {
      username: this.f.username.value,
      password: this.f.password.value,
    };

    this.authService
      .login(userCredentials)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || ''; // should be dashboard as a home page 
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.alert.error(error);
        }
      });
  }

}
