import { Card } from "./Card";
import { ICard } from "../../types";
import { IActions } from "../../types";
import { ensureElement } from "../../utils/utils";

export class CardBasket extends Card<ICard> {
  actionButtonElement: HTMLButtonElement;

  constructor (container: HTMLElement, actions: IActions) {
    super(container);
    this.actionButtonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);
    this.actionButtonElement.addEventListener("click", actions.onClick)
  }

}