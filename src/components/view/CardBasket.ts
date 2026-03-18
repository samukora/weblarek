import { Card } from "./Card";
import { ICard } from "../../types";
import { EventEmitter } from "../base/Events";

export class CardBasket extends Card<ICard> {

  constructor (container: HTMLElement, eventEmitter: EventEmitter) {
    super(container, eventEmitter);
  }
}