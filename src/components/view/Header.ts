import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IActions } from "../../types";

export interface IHeader {
  counter: number;
  counterElement: HTMLElement;
  basketElement: HTMLElement;
}

export class Header extends Component<IHeader> {
  private counterElement: HTMLElement;
  private basketElement: HTMLElement;

  constructor(container: HTMLElement, actions: IActions) {
    super(container);

    this.counterElement = ensureElement<HTMLElement>(".header__basket-counter", this.container);
    this.basketElement = ensureElement<HTMLElement>(".header__basket", this.container);

    this.basketElement.addEventListener('click', actions.onClick); 
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}