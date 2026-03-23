import { Form } from "./Form";
import { IActions, IForm } from "../../types";
import { ensureElement, debounce } from "../../utils/utils";

export interface IFormContacts extends IForm {
  emailElement: HTMLElement;
  phoneElement: HTMLElement;
}

interface IContactsActions extends IActions {
  onContactsChange: (event: Event) => void;
}

export class FormContacts extends Form<IFormContacts> {
  private emailElement: HTMLElement;
  private phoneElement: HTMLElement;

  constructor(container: HTMLElement, actions: IContactsActions) {
    super(container, actions);

    this.emailElement = ensureElement<HTMLElement>(
      "input[name='email']",
      this.container,
    );
    this.emailElement.addEventListener(
      "keyup",
      debounce(actions.onContactsChange, 300),
    );

    this.phoneElement = ensureElement<HTMLElement>(
      "input[name='phone']",
      this.container,
    );
    this.phoneElement.addEventListener(
      "keyup",
      debounce(actions.onContactsChange, 300),
    );
  }
}
