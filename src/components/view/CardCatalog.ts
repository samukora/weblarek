import { Card } from "./Card";
import { ICard } from "../../types";
import { ensureElement } from "../../utils/utils";
import { CDN_URL, categoryMap } from "../../utils/constants";

export interface ICardCatalog extends ICard {
  image: string;
  category: string;
}

interface ICardActions {
  onClick: () => void;
}

type TCategory = keyof typeof categoryMap;

export class CardCatalog extends Card<ICardCatalog> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

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

    this.container.addEventListener("click", actions.onClick);
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
    this.categoryElement.className = "card__category";
    this.categoryElement.classList.add(categoryMap[value as TCategory]);
  }

  set image(value: string) {
    this.setImage(this.imageElement, `${CDN_URL}/${value}`, value);
  }
}
