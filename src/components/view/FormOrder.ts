import { Form } from "./Form";
import { IFormOrder } from "../../types";
import { ensureElement } from "../../utils/utils";

export class FormOrder extends Form<IFormOrder> {
  paymentElement: HTMLElement;
  addressElement: HTMLElement;

  constructor(container:HTMLElement) {
    super(container);
    this.paymentElement = ensureElement(".order__buttons", this.container);
    this.addressElement = ensureElement("input[name='address']", this.container);
  }
}