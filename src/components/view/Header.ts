import { Component } from "../base/Component";
import { IHeader } from "../../types";
import { ensureElement } from "../../utils/utils";

export class Header extends Component<IHeader> {
  counterElement: HTMLElement;
  basketElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.counterElement = ensureElement(".header__basket-counter", this.container);
    this.basketElement = ensureElement(".header__basket", this.container);
  }

  set counter(value: number) {
    this.counter = value;
    // TODO: тут скорее сего нужно вызвать какой-то метод по добавлению значения в счетчик так как он не может храниться таким образом
  }
}