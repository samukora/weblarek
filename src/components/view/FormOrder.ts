import { Form } from "./Form";
import { ensureElement } from "../../utils/utils";
import { IForm, TPayment } from "../../types";
import { IEvents } from "../base/Events";

interface IFormOrder extends IForm {
  paymentButtonsElement: HTMLElement;
  cardButtonElement: HTMLButtonElement;
  cashButtonElement: HTMLButtonElement;
  addressElement: HTMLElement;
}

export class FormOrder extends Form<IFormOrder> {
  private paymentButtonsElement: HTMLElement;
  private cardButtonElement: HTMLButtonElement;
  private cashButtonElement: HTMLButtonElement;
  private addressElement: HTMLInputElement;

  constructor(container: HTMLElement, eventEmitter: IEvents) {
    super(container, {
      onClick: () => {
        eventEmitter.emit("order:submit");
      },
    });

    this.paymentButtonsElement = ensureElement<HTMLElement>(
      ".order__buttons",
      this.container,
    );

    this.cardButtonElement = ensureElement<HTMLButtonElement>(
      "button[name='card']",
      this.paymentButtonsElement,
    );
    this.cardButtonElement.addEventListener("click", () =>
      eventEmitter.emit("customer:change", {
        payment: this.cardButtonElement.name,
      })
    );

    this.cashButtonElement = ensureElement<HTMLButtonElement>(
      "button[name='cash']",
      this.paymentButtonsElement,
    );
    this.cashButtonElement.addEventListener("click", () =>
      eventEmitter.emit("customer:change", {
        payment: this.cashButtonElement.name,
      })
    );

     this.addressElement = ensureElement<HTMLInputElement>(
      "input[name='address']",
      this.container,
    );
    this.addressElement.addEventListener("keyup", () =>
      eventEmitter.emit("customer:change", {
        address: this.addressElement.value,
      })
    );
  }

  set payment(value: TPayment) {
    this.cardButtonElement.classList.toggle(
      "button_alt-active",
      value === "card",
    );
    this.cashButtonElement.classList.toggle(
      "button_alt-active",
      value === "cash",
    );
  }

  set address(value: string) {
    this.addressElement.textContent = value;
  }
}
