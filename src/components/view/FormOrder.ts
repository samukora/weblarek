import { Form } from "./Form";
import { ensureElement } from "../../utils/utils";
import { IActions, TPayment } from "../../types";

 interface IFormOrder {
  paymentButtonsElement: HTMLElement;
  cardButtonElement: HTMLButtonElement;
  cashButtonElement: HTMLButtonElement;
  addressElement: HTMLElement;
  submitButtonElement: HTMLButtonElement;
  errorsElement: HTMLElement;
}

interface IOrderActions extends IActions {
  onPaymentChange: (event: Event) => void,
  onAddressChange: (event: Event) => void,
}

export class FormOrder extends Form<IFormOrder> {
  private paymentButtonsElement: HTMLElement;
  private cardButtonElement: HTMLButtonElement;
  private cashButtonElement: HTMLButtonElement;
  private addressElement: HTMLElement;
  private submitButtonElement: HTMLButtonElement;
  private errorsElement: HTMLElement;

  constructor(container:HTMLElement, actions: IOrderActions) {
    super(container);
    this.paymentButtonsElement = ensureElement(".order__buttons", this.container);
    this.addressElement = ensureElement("input[name='address']", this.container);
    this.addressElement.addEventListener("change", actions.onAddressChange);
    
    this.cardButtonElement = ensureElement<HTMLButtonElement>("button[name='card']", this.paymentButtonsElement);
    this.cardButtonElement.addEventListener("click", actions.onPaymentChange);

    this.cashButtonElement = ensureElement<HTMLButtonElement>("button[name='cash']", this.paymentButtonsElement);
    this.cashButtonElement.addEventListener("click", actions.onPaymentChange);

    this.submitButtonElement = ensureElement<HTMLButtonElement>("button[type=submit]", this.container)
    this.submitButtonElement.addEventListener("click", actions.onClick);

    this.errorsElement = ensureElement<HTMLElement>(".form__errors", this.container)
  }

  set payment(value: TPayment){
    if (value === "card") {
      this.cardButtonElement.classList.add("button_alt-active");
      this.cashButtonElement.classList.remove("button_alt-active");
    }
    if (value === "cash") {
      this.cashButtonElement.classList.add("button_alt-active");
      this.cardButtonElement.classList.remove("button_alt-active");
    }
  }

  set canContinue(value: boolean) {
    this.submitButtonElement.disabled = value;
  }

  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
}
