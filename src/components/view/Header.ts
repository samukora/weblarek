import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export interface IHeader {
  counter: number;
  counterElement: HTMLElement;
  basketElement: HTMLElement;
}

export class Header extends Component<IHeader> {
  counterElement: HTMLElement;
  basketElement: HTMLElement;
  eventEmmiter: IEvents;

  constructor(container: HTMLElement, eventEmmiter: IEvents) {
    super(container);
    this.eventEmmiter = eventEmmiter;

    this.counterElement = ensureElement(".header__basket-counter", this.container);
    this.basketElement = ensureElement(".header__basket", this.container);

    this.basketElement.addEventListener('click', () => {
      this.eventEmmiter.emit("basket:open");
    });

  }

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}