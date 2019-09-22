import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmitReset(form: NgForm) {
    if (this.resetForm.invalid) {
      return;
  }
    this.userService.resetPassword(this.resetForm.value).subscribe( (user) => {
      console.log(user);
      this.router.navigateByUrl('/login');
  },
  (error) => {
      console.log( error);
  });
  }
}
