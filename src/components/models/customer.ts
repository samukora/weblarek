import {
  TPayment,
  ICustomer,
  TCustomerErrors,
} from "../../../src/types/index";

export class Customer {
  private payment: TPayment =  '';
  private email: string =  '';
  private phone: string = '';
  private address: string = '';

  constructor() {}

  validateInfo(): TCustomerErrors {
    const fieldRules = [
      { field: "payment", check: (value: string): string => value === ''? 'Выберите тип оплаты': '' },
      { field: "email", check: (value: string): string => value === ''? 'Введите адрес электронной почты': '' },
      { field: "phone", check: (value: string): string => value === ''? 'Введите номер телефона': '' },
      { field: "address", check:(value: string): string => value === ''? 'Введите адрес доставки': '' },
    ] as const;

    return fieldRules.reduce((acc, { field, check }) => {
      if (!this[field]) {
        acc[field] = check(this[field]);
      }
      return acc;
    }, {} as TCustomerErrors);
  }

  clearInfo(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  getInfo(): ICustomer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  setInfo({payment, email, phone, address}: ICustomer): void {
    if (payment) this.payment = payment;
    if (email) this.email = email;
    if (phone) this.phone = phone;
    if (address) this.address = address;
  }
}
