import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneInterface } from '../../../interfaces/phone.interface';
import { PhoneService } from '../../../services/phone.service';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { HttpService } from '../../../services/http.service';
import { environment } from '../../../environments/environment';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule, FormErrorComponent, NgxMaskDirective],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  form: FormGroup;
  phone: any = {}
  public error:string = "";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private phoneService: PhoneService,
    public router: Router,
    public httpService: HttpService,
  ) {

    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.phone = this.phoneService.getPhone(id);
    }

    this.form = this.formBuilder.group({
      phone: [this.phone?.phone || "", [Validators.required, Validators.maxLength(50)]],
      monthly_price: [this.phone?.monthly_price || "", [Validators.required]],
      setup_price: [this.phone?.setup_price || "", [Validators.required]],
      currency: [this.phone?.currency || "", [Validators.required, Validators.maxLength(5)]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {

    if (!this.form.invalid) {

      let data = {
        id: this.phone?.id,
        phone: this.form.get("phone")?.value,
        monthly_price: this.form.get("monthly_price")?.value,
        setup_price: this.form.get("setup_price")?.value,
        currency: this.form.get("currency")?.value,
      }

      // Caso exista o telefone, redireciona para a atualização dos seus dados
      if (this.phone?.id) {
        this.updatePhone(data);

      // Caso não exista o telefone, redireciona para a inserção dos seus dados
      } else {
        this.insertPhone(data);
      }

    }

  }

  insertPhone(data:any) {
    this.httpService.post(environment.url + '/phones', data).then((data:any) =>{
      this.router.navigate(["phones"]).then(() => {
        window.location.reload();
      });

    }).catch((err:any)=> {
      this.manageError(err);
    });
  }

  updatePhone(data:any) {
    this.httpService.put(environment.url + '/phones', data).then((data:any) =>{
      this.router.navigate(["phones"]).then(() => {
        window.location.reload();
      });

    }).catch((err:any)=> {
      this.manageError(err);
    });
  }

  /**
   * Função responsável por lidar com mensagens de erro
   * @param err
   */
  manageError(err:any) {
    if (err.status == 400) {
      this.error = err.error;

    } else {
      this.error = "Ocorreu um problema ao acessar, contate um admnistrador ou tente novamente mais tarde.";
    }

    setTimeout(() => {
      this.error = "";
    }, 5000);
  }

}
