import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./phone/phone.module').then(m => m.PhoneModule)
  },
  {
    path: 'phones',
    loadChildren: () => import('./phone/phone.module').then(m => m.PhoneModule)
  },
  {
    path: 'phones/form',
    loadChildren: () => import('./phone-form/phone-form.module').then(m => m.PhoneFormModule)
  },
];
