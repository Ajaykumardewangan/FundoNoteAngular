import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private userService: UserService, private router: Router ) { }

  ngOnInit()  {
    this.registerForm = new FormGroup({
      firstName: new FormControl( '', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl ('', [Validators.required, Validators.pattern('[6-9]\\d{9}')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

onSubmit(form: NgForm) {
  if (this.registerForm.invalid) {
    return;
}
  this.userService.registration(this.registerForm.value).subscribe( (user) => {
    console.log(user);
    this.router.navigateByUrl('/login');
},
(error) => {
    console.log( error);
});
}
}
