import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { UserIdentifier } from 'src/app/models/user-identifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userIdentitiy: UserIdentifier;
  constructor(
     private userService: UserService,
     private router: Router,
     @Inject(LOCAL_STORAGE) private storage: WebStorageService ) { }

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
      localStorage.setItem('token', data.msg);
      this.router.navigate(['/dashboard']);
  },
  (error) => {
      console.log(error);
  });
  }
}
