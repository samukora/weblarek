import { Form } from "./Form";
import { ensureElement, debounce } from "../../utils/utils";
import { IActions, IForm, TPayment } from "../../types";

interface IFormOrder extends IForm {
  paymentButtonsElement: HTMLElement;
  cardButtonElement: HTMLButtonElement;
  cashButtonElement: HTMLButtonElement;
  addressElement: HTMLElement;
}

interface IOrderActions extends IActions {
  onPaymentChange: (event: Event) => void;
  onAddressChange: (event: Event) => void;
}

export class FormOrder extends Form<IFormOrder> {
  private paymentButtonsElement: HTMLElement;
  private cardButtonElement: HTMLButtonElement;
  private cashButtonElement: HTMLButtonElement;
  private addressElement: HTMLElement;

  constructor(container: HTMLElement, actions: IOrderActions) {
    super(container, actions);
    this.paymentButtonsElement = ensureElement<HTMLElement>(
      ".order__buttons",
      this.container,
    );
    this.addressElement = ensureElement<HTMLElement>(
      "input[name='address']",
      this.container,
    );
    this.addressElement.addEventListener(
      "keyup",
      debounce(actions.onAddressChange, 300),
    );

    this.cardButtonElement = ensureElement<HTMLButtonElement>(
      "button[name='card']",
      this.paymentButtonsElement,
    );
    this.cardButtonElement.addEventListener("click", actions.onPaymentChange);

    this.cashButtonElement = ensureElement<HTMLButtonElement>(
      "button[name='cash']",
      this.paymentButtonsElement,
    );
    this.cashButtonElement.addEventListener("click", actions.onPaymentChange);
  }

  set payment(value: TPayment) {
    if (value === "card") {
      this.cardButtonElement.classList.add("button_alt-active");
      this.cashButtonElement.classList.remove("button_alt-active");
    }
    if (value === "cash") {
      this.cashButtonElement.classList.add("button_alt-active");
      this.cardButtonElement.classList.remove("button_alt-active");
    }
  }
}
