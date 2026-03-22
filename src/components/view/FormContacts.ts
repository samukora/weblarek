import { Form } from "./Form";
import { IActions } from "../../types";
import { ensureElement } from "../../utils/utils";

export interface IFormContacts {
  emailElement: HTMLElement;
  phoneElement: HTMLElement;
  submitButtonElement: HTMLButtonElement;
  errorsElement: HTMLElement;
}

interface IContactsActions extends IActions {
  onContactsChange: (event: Event) => void
}

export class FormContacts extends Form<IFormContacts> {
  private emailElement: HTMLElement;
  private phoneElement: HTMLElement;
  private submitButtonElement: HTMLButtonElement;
  private errorsElement: HTMLElement;

  constructor(container: HTMLElement, actions: IContactsActions) {
    super(container);

    this.emailElement = ensureElement<HTMLElement>("input[name='email']", this.container);
    this.emailElement.addEventListener('change', actions.onContactsChange);

    this.phoneElement = ensureElement<HTMLElement>("input[name='phone']", this.container);
    this.phoneElement.addEventListener('change', actions.onContactsChange);

    this.submitButtonElement = ensureElement<HTMLButtonElement>("button[type=submit]", this.container);
    this.submitButtonElement.addEventListener("click", actions.onClick);

    this.errorsElement = ensureElement<HTMLElement>(".form__errors", this.container)
  }

  set canContinue(value: boolean) {
    this.submitButtonElement.disabled = value;
  }

  set errors(value: string) {
    this.errorsElement.textContent = value;
  }
}