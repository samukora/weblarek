import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IActions } from "../../types";

export abstract class Form<T> extends Component<T> {
  protected submitButtonElement: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(container: HTMLElement, actions: IActions) {
    super(container);

    this.submitButtonElement = ensureElement<HTMLButtonElement>(
      "button[type=submit]",
      this.container,
    );
    this.submitButtonElement.addEventListener("click", actions.onClick);

    this.errorsElement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );
  }

  set canContinue(value: boolean) {
    this.submitButtonElement.disabled = value;
  }

  set errors(values: {}) {
    this.errorsElement.textContent = "";
    Object.values(values).forEach((elem) => {
      this.errorsElement.insertAdjacentHTML("beforeend", `<p>${elem}</p>`);
    });
  }
}
