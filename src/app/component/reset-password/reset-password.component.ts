import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl, ValidationErrors } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/Validators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  token: string;
  matcher = new MyErrorStateMatcher();
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.resetForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
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
      this.snackbar.open('reminder added on note', 'ok', {duration: 3000});
      this.router.navigateByUrl('/login');
  },
  (error) => {
      console.log( error);
      this.snackbar.open(error.error.description, 'error', {duration: 3000});
  });
  }

   matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}
}
