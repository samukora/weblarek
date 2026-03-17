import { Card } from "./Card";
import { ICard } from "../../types";

export class CardBasket extends Card<ICard> {

  constructor (container: HTMLElement) {
    super(container);
  }
}