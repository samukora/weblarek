import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";

export abstract class Card<T> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected eventEmitter: EventEmitter;

  constructor (container: HTMLElement, eventEmitter: EventEmitter) {
    super(container);
    this.titleElement = ensureElement<HTMLElement>(".card__title", this.container);
    this.priceElement = ensureElement<HTMLElement>(".card__price", this.container);
    this.eventEmitter = eventEmitter;
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set price(value: number) {
    this.priceElement.textContent = String(value);
  }
}