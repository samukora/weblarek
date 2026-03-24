import { Card } from "./Card";
import { ICard } from "../../types";
import { ensureElement } from "../../utils/utils";
import { CDN_URL, categoryMap } from "../../utils/constants";

interface ICardPreview extends ICard {
  image: string;
  category: string;
  description: string;
  buttonDisable: boolean;
  buttonText: string;
}

interface ICardActions {
  onClick: () => void;
}

type TCategory = keyof typeof categoryMap;

export class CardPreview extends Card<ICardPreview> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected actionButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions: ICardActions) {
    super(container);
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.actionButtonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );
    this.actionButtonElement.addEventListener("click", actions.onClick);
  }
  
  set image(value: string) {
    this.setImage(this.imageElement, `${CDN_URL}/${value}`, value);
  }
  
  set category(value: string) {
    this.categoryElement.textContent = value;
    this.categoryElement.className = "card__category";
    this.categoryElement.classList.add(categoryMap[value as TCategory]);
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
