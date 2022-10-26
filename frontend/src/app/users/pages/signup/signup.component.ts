import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignupRequest } from 'app/interfaces/signuprequest.interface';
import { Signup } from 'app/store/actions/auth.actions';
import { AppState } from 'app/store/app.state';

interface SignupForm {
  firstName: FormControl<string>,
  lastName: FormControl<string>,
  email: FormControl<string>,
  password: FormControl<string>
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm  = new FormGroup<SignupForm>({
    firstName: new FormControl('', {
      nonNullable: true, 
      validators: Validators.compose([
        Validators.required,
      ])}),
    lastName: new FormControl('', {
      nonNullable: true, validators: Validators.compose([
        Validators.required
      ])}),
    email: new FormControl('', {
      nonNullable: true, validators: Validators.compose([
        Validators.required,
        Validators.email
      ])}),
    password: new FormControl('', {
      nonNullable: true, validators: Validators.compose([
        Validators.required
      ])}),
  })

  get form() {
    return this.signupForm.controls;
  }

  constructor(private store: Store<AppState>, private route: Router) { }

  ngOnInit(): void {
  }

  gotoLogin():void{
    this.route.navigate(["user/login"])
  }
  onSubmit(): void {
    if (this.signupForm.valid) {
      const request: SignupRequest = {
        firstName: this.form.firstName.value,
        lastName: this.form.lastName.value,
        email: this.form.email.value,
        password: this.form.password.value,
      }
      this.store.dispatch(Signup({ request }))
    alert("Account confirmation link has been sent to your email")
      this.route.navigate(['/user/login'])
    }
  }

}
