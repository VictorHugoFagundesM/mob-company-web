import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      name: new FormControl(''), // default value
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
}
