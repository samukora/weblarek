import { Form } from "./Form";
import { IForm } from "../../types";
import { ensureElement} from "../../utils/utils";
import { IEvents } from "../base/Events";

export interface IFormContacts extends IForm {
  email: string;
  phone: string;
}

export class FormContacts extends Form<IFormContacts> {
  private emailElement: HTMLInputElement;
  private phoneElement: HTMLInputElement;

  constructor(container: HTMLElement, eventEmitter: IEvents) {
    super(container, {
      onClick: () => {
        eventEmitter.emit("contacts:submit");
      },
    });

    this.emailElement = ensureElement<HTMLInputElement>(
      "input[name='email']",
      this.container,
    );
    this.emailElement.addEventListener("keyup", () =>
      eventEmitter.emit("customer:change", {
        email: this.emailElement.value,
      }),
    );

    this.phoneElement = ensureElement<HTMLInputElement>(
      "input[name='phone']",
      this.container,
    );
    this.phoneElement.addEventListener("keyup", () =>
      eventEmitter.emit("customer:change", {
        phone: this.phoneElement.value,
      }),
    );
  }

  set email(value: string) {
    this.emailElement.textContent = value;
  }

  set phone(value: string) {
    this.phoneElement.textContent = value;
  }
}
