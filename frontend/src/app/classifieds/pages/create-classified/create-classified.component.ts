import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ClassifiedCreationRequest } from 'app/interfaces/classifiedcreationrequest.interface';
import { CreateClassified } from 'app/store/actions/classified.actions';
import { AppState } from 'app/store/app.state';

interface ClassifiedForm {
  title: FormControl<string>,
  description: FormControl<string>
}

@Component({
  selector: 'app-create-classified',
  templateUrl: './create-classified.component.html',
  styleUrls: ['./create-classified.component.css']
})
export class CreateClassifiedComponent implements OnInit {

  classifiedForm = new FormGroup<ClassifiedForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.compose([
        Validators.required,
      ])
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: Validators.compose([
        Validators.required
      ])
    })
  })

  get form() {
    return this.classifiedForm.controls;
  }

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.classifiedForm.valid) {
      const request: ClassifiedCreationRequest = {
        title: this.form.title.value,
        description: this.form.description.value
      }
      this.store.dispatch(CreateClassified({ request }));
    }
  }

}
