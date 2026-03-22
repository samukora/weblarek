import { Card } from "./Card";
import { ICard} from "../../types";
import { ensureElement } from "../../utils/utils";
import { CDN_URL } from "../../utils/constants";

interface ICardPreview extends ICard {
  imageElement: HTMLElement;
  categoryElement: HTMLElement;
  descriptionElement: HTMLElement;
}

interface ICardActions {
  onClick: () => void;
}

export class CardPreview extends Card<ICardPreview> {
  protected imageElement: HTMLElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected actionButtonElement: HTMLButtonElement;

  constructor (container: HTMLElement, actions: ICardActions) {
    super(container);
    this.imageElement = ensureElement<HTMLElement>(".card__image", this.container);
    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.descriptionElement = ensureElement<HTMLElement>(".card__text", this.container);
    this.actionButtonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);
    
    this.actionButtonElement.addEventListener("click", actions.onClick);
  }

  set image(value: string) {
    this.imageElement.setAttribute("src", `${CDN_URL}/${value}`);
    this.imageElement.setAttribute("alt", value);
  }

  set category(value: string){
    this.categoryElement.textContent = value;
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonDisable(value: boolean) {
    this.actionButtonElement.disabled = value;
  }

  set buttonText(value: string) {
    this.actionButtonElement.textContent = value;
  }
}