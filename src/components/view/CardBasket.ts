import { Card } from "./Card";
import { IActions, ICard } from "../../types";
import { ensureElement } from "../../utils/utils";

interface ICardBasket extends ICard {
  index: number;
}
export class CardBasket extends Card<ICardBasket> {
  private actionButtonElement: HTMLButtonElement;
  private indexElement: HTMLElement;

  constructor(container: HTMLElement, actions: IActions) {
    super(container);

    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );
    this.actionButtonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );
    this.actionButtonElement.addEventListener("click", actions.onClick);
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}
