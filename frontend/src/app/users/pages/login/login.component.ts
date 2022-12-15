import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ClassifiedService } from 'app/classifieds/services/classified.service';
import { LoginRequest } from 'app/interfaces/loginrequest.interface';
import { Login } from 'app/store/actions/auth.actions';
import { AppState } from 'app/store/app.state';

interface LoginForm {
  email: FormControl<string>,
  password: FormControl<string>
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup<LoginForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: Validators.compose([
        Validators.required,
        Validators.email
      ])
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: Validators.compose([
        Validators.required
      ])
    })
  });

  get form() {
    return this.loginForm.controls;
  }

  constructor(private store: Store<AppState>, private router: Router,
    
    private classifiedService: ClassifiedService,
    
    ) { }

  ngOnInit(): void {

    
  }




  gotoSignup():void{
  this.router.navigate(['/user/signup'])
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const request: LoginRequest = {
        email: this.form.email.value,
        password: this.form.password.value
      }
      this.store.dispatch(Login({ request }))
    }
  }

}
