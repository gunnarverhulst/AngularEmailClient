import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, SigninCredentials } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private authService: AuthService, private router: Router){}

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  })

  onSubmit(){
    if (this.authForm.invalid){
      return;
    }

    this.authService.signin(this.authForm.value as SigninCredentials)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/inbox');
      },
      error: ({error}) => {
        if(error.username || error.password){
          this.authForm.setErrors({ falseCredentials: true });
        }else if (!error.status){
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true })
        }
      }
    });

  }

}
