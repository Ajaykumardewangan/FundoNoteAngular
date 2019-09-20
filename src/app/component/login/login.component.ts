import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private userService: UserService, private router: Router ) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (this.loginForm.invalid) {
      return;
  }
    this.userService.login(this.loginForm.value).subscribe( () => {
      this.router.navigate(['/dashboard']);
  },
  () => {
      console.log( 'failed to Login');
  });
  }

}
