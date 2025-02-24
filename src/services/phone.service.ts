// @ts-ignore
import { Injectable } from '@angular/core';
import { PhoneInterface } from '../interfaces/phone.interface';

@Injectable()
export class PhoneService {
  public phones: PhoneInterface[] = [];

	constructor(
	) {
	}

  setData(phones: PhoneInterface[]): any{
    this.phones = phones;
  }

  getData() {
    return this.phones;
  }

  // Obtém os dados a partir do id de uma linha telefônica
  public getPhone(id:string): PhoneInterface|{}{
    let phone:PhoneInterface|{} = {};

    for (let index = 0; index < this.phones.length; index++) {
      const element:any = this.phones[index];
      if (element.id == id) {
        phone = element;
        break;
      }
    }

    return phone;
  }

}
