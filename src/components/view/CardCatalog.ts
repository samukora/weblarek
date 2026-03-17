import { Card } from "./Card";
import { ICardCatalog } from "../../types";
import { ensureElement } from "../../utils/utils";

export class CardCatalog extends Card<ICardCatalog> {
  imageElement: HTMLElement;
  categoryElement: HTMLElement;
  descriptionElement: HTMLElement;

  constructor (container: HTMLElement) {
    super(container);
    this.imageElement = ensureElement<HTMLElement>(".card__image", this.container);
    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.descriptionElement = ensureElement<HTMLElement>(".card__text", this.container);
  }
}