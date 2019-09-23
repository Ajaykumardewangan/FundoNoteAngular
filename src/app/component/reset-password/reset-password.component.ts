import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  token: string;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('token');
      console.log(this.token);
  });
}

  onSubmitReset(form: NgForm) {
    console.log(form);
    if (this.resetForm.invalid) {
      return;
  }
    console.log(this.token);
    this.userService.resetPassword(this.resetForm.value, this.token).subscribe( (user) => {
      console.log(user);
      this.router.navigateByUrl('/login');
  },
  (error) => {
      console.log( error);
  });
  }
}
