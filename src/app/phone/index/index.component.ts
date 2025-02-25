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
  public filteredPhones: PhoneInterface[] = [];
  public searchText: string = '';
  public itemsPerPage: number = 10;
  public p: number = 1;
  public paginationOptions: number[] = [
    10, 20, 30, 40, 50
  ]
  public form:any;

  public error:string = "";
  public success:string = "";
  public isModalOpen = false;
  private modalResolver!: (value: boolean) => void;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public phoneService: PhoneService,
    public httpService: HttpService,
  ) {
    this.phones = this.phoneService.getData();
    this.filteredPhones = JSON.parse(JSON.stringify(this.phones));
  }

  ngOnInit() {
    this.searchText = "";

    this.form = this.formBuilder.group({
      search: [this.searchText  || ""],
      paginate: [this.itemsPerPage],
    });
  }

  /**
   * Ordena os dados de acordo com a coluna selecionada
   * @param column
   * @param event
   */
  public orderBy(column:string, event: Event) {
    const element = event.target as HTMLElement;
    let dateColumns = ["created_at", "updated_at"];

    // Ordena as colunas por ordem ascendente
    if (element.classList.contains("asc")) {

      element.classList.remove("asc");

      this.filteredPhones.sort((a:any, b:any) => {

        if (dateColumns.includes(column)) {
          return new Date(a[column]).getTime() - new Date(b[column]).getTime();
        }

        return a[column] - b[column];
      });

    } else {

      this.filteredPhones.sort((a:any, b:any) => {

        if (dateColumns.includes(column)) {
          return new Date(b[column]).getTime() - new Date(a[column]).getTime();
        }
        return b[column] - a[column]
      });

      element.classList.add("asc");
    }
  }

  openConfirmation(): Promise<boolean> {
    this.isModalOpen = true;
    return new Promise<boolean>((resolve) => {
      this.modalResolver = resolve;
    });
  }

  handleResponse(response: boolean, event: Event): void {
    event.stopPropagation();
    this.isModalOpen = false;
    if (this.modalResolver) {
      this.modalResolver(response);
    }
  }

  /**
   * Ao realizar uma pesquisa
   */
  onSearchChange() {
    this.searchText = this.form.get("search")?.value;

    this.filteredPhones = this.phones.filter((phone: PhoneInterface) => {
      let phoneNormalized = phone.phone.toLowerCase().replace(/[^a-z0-9]/g, "");
      let searchNormalized = this.searchText.toLowerCase().replace(/[^a-z0-9]/g, "");
      return phoneNormalized.includes(searchNormalized);
    });

  }

  /**
   * Aplica a máscara no campo de telefone
   * @param phone
   * @param type
   * @returns
   */
  public getMaskedValue(phone:string, type:string) {
    return mask(phone, "phone");
  }

  /**
   * Remove uma linha telefônica
   * @param phoneId
   */
  public deletePhone(phoneId:number) {

    this.openConfirmation().then((response:boolean) => {

      if (response) {

        this.httpService.delete(environment.url + '/phones/'+phoneId+'/delete').then((data:any) =>{
          this.success = "Linha telefônica apagada com sucesso!";
          this.phones = this.phones.filter((phone:PhoneInterface) => phone.id != phoneId)
          this.filteredPhones = this.filteredPhones.filter((phone:PhoneInterface) => phone.id != phoneId)

          setTimeout(() => {
            this.success = "";
          }, 5000);

        }).catch((err:any)=> {
          if (err.status == 400) {
            this.error = err.error;

          } else {
            this.error = "Ocorreu um problema ao apaga a linha, contate um admnistrador ou tente novamente mais tarde.";
          }

          setTimeout(() => {
            this.error = "";
          }, 5000);
        });

      }

    })

  }

}
