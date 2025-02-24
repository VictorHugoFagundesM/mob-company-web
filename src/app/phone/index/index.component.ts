import { PhoneService } from './../../../services/phone.service';
import { CommonModule } from '@angular/common';
import { PhoneInterface } from '../../../interfaces/phone.interface';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { mask } from '../../../utils/functions';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-index',
  imports: [CommonModule, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  public phones: PhoneInterface[] = [];
  public searchText: string = '';
  public itemsPerPage: number = 10;
  public p: number = 1;
  public paginationOptions: number[] = [
    10, 20, 30, 40, 50
  ]
  public form:any;

  public error:string = "";
  public success:string = "";

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public phoneService: PhoneService,
    public httpService: HttpService,
  ) {
    this.phones = this.phoneService.getData();
  }

  ngOnInit() {
    this.searchText = "";

    this.form = this.formBuilder.group({
      search: [this.searchText  || ""],
      paginate: [this.itemsPerPage],
    });
  }

  public orderBy(column:string) {

  }

  public getMaskedValue(phone:string, type:string) {
    return mask(phone, "phone");
  }

  public deletePhone(phoneId:string) {
    this.httpService.delete(environment.url + '/phones/'+phoneId+'/delete').then((data:any) =>{
      this.router.navigate(["phones"]).then(() => {
        window.location.reload();
      });

    }).catch((err:any)=> {
      if (err.status == 400) {
        this.error = err.error;

      } else {
        this.error = "Ocorreu um problema ao acessar, contate um admnistrador ou tente novamente mais tarde.";
      }

      setTimeout(() => {
        this.error = "";
      }, 5000);
    });
  }

}
