import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpService } from '../services/http.service';
import { PhoneService } from '../services/phone.service';
import { environment } from '../environments/environment';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    HttpService,
    PhoneService,
    provideNgxMask(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAppInitializer(() => initializeApp(inject(HttpService), inject(PhoneService))),
  ]
};

/**
 * Carrega os telefones
 * @param httpService
 * @param phoneService
 * @returns
 */
export function initializeApp(httpService: HttpService, phoneService: PhoneService) {
  let appUrl: string = environment.url;

  return new Promise((resolve, reject) => {
    return httpService.get(appUrl + '/phones').then((data:any) =>{
      phoneService.setData(data);
      resolve(true);

    }).catch(()=> {
      reject(false);
    });
  });

}
