import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: ":id/edit",
    component: FormComponent,
    pathMatch: "prefix"
  },
  {
    path: "create",
    component: FormComponent,
    pathMatch: "prefix"
  },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PhoneFormModule { }
