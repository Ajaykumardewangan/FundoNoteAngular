import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm: FormGroup;
  constructor(private userService: UserService, private router: Router ) { }

  ngOnInit() {
    this.forgetForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      resetPasswordUrl: new FormControl('http://localhost:4200/resetpassword')
      });
  }

  onSubmitForget(form: NgForm) {
    console.log(form);
    if (this.forgetForm.invalid) {
      return;
  }
    console.log(this.forgetForm.value);
    this.userService.forgetPassword(this.forgetForm.value).subscribe( (res) => {
      console.log(res);
      this.router.navigate(['/login']);
  },
  (error) => {
      console.log(error);
  });
}
}
