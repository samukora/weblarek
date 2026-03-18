import { Card } from "./Card";
import { ICard} from "../../types";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";

interface ICardPreview extends ICard {
  imageElement: HTMLElement;
  categoryElement: HTMLElement;
  descriptionElement: HTMLElement;
}

export class CardPreview extends Card<ICardPreview> {
  protected imageElement: HTMLElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;

  constructor (container: HTMLElement, eventEmitter: EventEmitter) {
    super(container, eventEmitter);
    this.imageElement = ensureElement<HTMLElement>(".card__image", this.container);
    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.descriptionElement = ensureElement<HTMLElement>(".card__text", this.container);
  }

  set image(value: string) {
    this.imageElement.setAttribute("src", value);
    this.imageElement.setAttribute("alt", this.titleElement.textContent);
  }

  set category(value: string){
    this.categoryElement.textContent = value;
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }
}