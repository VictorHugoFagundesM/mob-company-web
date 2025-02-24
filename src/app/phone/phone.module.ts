import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: "",
  component: IndexComponent,
  pathMatch: "full"
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    IndexComponent
  ],
})
export class PhoneModule { }
