import {
  TPayment,
  TCustomer,
  TCustomerErrors,
} from "/Users/mac/Documents/JavaScript/Practicum Yandex/Projects/weblarek/src/types/index";

export class Customer {
  private payment?: TPayment;
  private email?: string;
  private phone?: string;
  private address?: string;

  constructor() {}

  validateInfo(): TCustomerErrors {
    const fieldRules = [
      { field: "payment", message: "Выберите тип оплаты" },
      { field: "email", message: "Введите адрес электронной почты" },
      { field: "phone", message: "Введите номер телефона" },
      { field: "address", message: "Введите адрес доставки" },
    ] as const;

    return fieldRules.reduce((acc, { field, message }) => {
      if (!this[field]) {
        acc[field] = message;
      }
      return acc;
    }, {} as TCustomerErrors);
  }

  clearInfo(): void {
    delete this.payment;
    delete this.email;
    delete this.phone;
    delete this.address;
  }

  getInfo(): Customer {
    return this;
  }

  setInfo(customer: TCustomer): void {
    this.payment = customer.payment;
    this.email = customer.email;
    this.phone = customer.phone;
    this.address = customer.address;
  }
}
