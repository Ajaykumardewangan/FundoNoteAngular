import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { UserIdentifier } from 'src/app/models/user-identifier';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: any;

  constructor(
     private userService: UserService,
     private router: Router,
     @Inject(LOCAL_STORAGE) private storage: WebStorageService,
     private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      console.log('inside invalid');
      return;
  }
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe( data => {
      console.log(data);
      console.log(data.msg);
      this.snackBar.open('login successfully', 'Ok', {duration: 2000});
      localStorage.setItem('token', data.msg);
      this.router.navigate(['/dashboard']);
  },
  (error: any) => {
      console.log(error);
      this.loginForm.reset();
      this.snackBar.open(error.error.description, 'error', {duration: 2000});
  });
  }
}
