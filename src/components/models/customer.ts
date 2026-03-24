import { TPayment, ICustomer, TCustomerErrors } from "../../../src/types/index";
import { IEvents } from "../base/Events";

export class Customer {
  payment: TPayment = "";
  email: string = "";
  phone: string = "";
  address: string = "";
  private eventEmitter: IEvents;

  constructor(eventEmitter: IEvents) {
      this.eventEmitter = eventEmitter;
    }

  validateInfo(): TCustomerErrors {
    const fieldRules = [
      {
        field: "payment",
        check: (value: string): string =>
          value === "" ? "Необходимо указать тип оплаты" : "",
      },
      {
        field: "email",
        check: (value: string): string =>
          value === "" ? "Необходимо указать адрес электронной почты" : "",
      },
      {
        field: "phone",
        check: (value: string): string =>
          value === "" ? "Необходимо указать номер телефона" : "",
      },
      {
        field: "address",
        check: (value: string): string =>
          value === "" ? "Необходимо указать адрес" : "",
      },
    ] as const;

    return fieldRules.reduce((acc, { field, check }) => {
      if (!this[field]) {
        acc[field] = check(this[field]);
      }
      return acc;
    }, {} as TCustomerErrors);
  }

  clearInfo(): void {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  getInfo(): ICustomer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  setInfo(data: Partial<ICustomer>): void {
    if (data.payment) {
      this.payment = data.payment;
      this.eventEmitter.emit("order:change");
    }
    if (data.email !== undefined) {
      this.email = data.email;
      this.eventEmitter.emit("contacts:change");
    }
    if (data.phone !== undefined) {
      this.phone = data.phone;
      this.eventEmitter.emit("contacts:change");
    }
    if (data.address !== undefined) {
      this.address = data.address;
      this.eventEmitter.emit("order:change");
    }
  }

}
