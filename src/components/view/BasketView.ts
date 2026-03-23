import { IActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IBasket {
  basket: HTMLElement[];
  totalAmount: number;
  buttonDisable: boolean;
}

export class BasketView extends Component<IBasket> {
  private basketListElements: HTMLElement;
  private basketTotalAmountElement: HTMLElement;
  private basketButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions: IActions) {
    super(container);
    this.basketListElements = ensureElement<HTMLElement>(
      ".basket__list",
      this.container,
    );
    this.basketTotalAmountElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container,
    );
    this.basketButtonElement = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );

    this.basketButtonElement.addEventListener("click", actions.onClick);
  }

  set basket(items: HTMLElement[]) {
    this.basketListElements.replaceChildren(...items);
  }

  set totalAmount(value: number) {
    this.basketTotalAmountElement.textContent = `${String(value)} синапсов`;
  }

  set buttonDisable(value: boolean) {
    this.basketButtonElement.disabled = value;
  }
}
