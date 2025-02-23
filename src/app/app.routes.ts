import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'phones',
    loadChildren: () => import('./phone/phone.module').then(m => m.PhoneModule)
  },
  {
    path: 'phones/update',
    loadChildren: () => import('./phone-form/phone-form.module').then(m => m.PhoneFormModule)
  },
  {
    path: 'phones/create',
    loadChildren: () => import('./phone-form/phone-form.module').then(m => m.PhoneFormModule)
  },
];
