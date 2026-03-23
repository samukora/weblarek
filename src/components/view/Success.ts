import { IActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ISuccess {
  totalAmountElement: HTMLElement;
  closeButtonElement: HTMLButtonElement;
}

export class Success extends Component<ISuccess> {
  private totalAmountElement: HTMLElement;
  private closeButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions: IActions) {
    super(container);

    this.totalAmountElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );
    this.closeButtonElement = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );
    this.closeButtonElement.addEventListener("click", actions.onClick);
  }

  set totalAmount(value: number) {
    this.totalAmountElement.textContent = `Списано ${String(value)} синапсов`;
  }
}
