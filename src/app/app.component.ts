import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Component, provideAppInitializer } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { HttpService } from '../services/http.service';
import { PhoneService } from '../services/phone.service';
import { environment } from '../environments/environment';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PageHeaderComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mob-company-web';
}
