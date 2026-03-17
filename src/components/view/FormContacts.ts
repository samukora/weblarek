import { Form } from "./Form";
import { IFormContacts } from "../../types";
import { ensureElement } from "../../utils/utils";

export class FormContacts extends Form<IFormContacts> {
  emailElement: HTMLElement;
  phoneElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.emailElement = ensureElement("input[name='email']", this.container);
    this.phoneElement = ensureElement("input[name='phone']", this.container);
  }
}