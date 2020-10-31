import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../helper/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.generateForm();
  }

  get f() { return this.registerForm.controls; }

  generateForm() {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]]
    });
  }

  onSubmit() {

    // stop here if form is invalid
    if (this.registerForm.invalid) return;

    if (this.f.password.value !== this.f.rePassword.value) {
      this.alert.error('passwords Not matched');
      return
    }



    const userCredentials = {
      username: this.f.username.value,
      password: this.f.password.value,
    };

    this.authService
      .register(userCredentials)
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
