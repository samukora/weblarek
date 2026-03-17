import { Card } from "./Card";
import { ICardPreview } from "../../types";
import { ensureElement } from "../../utils/utils";


export class CardPreview extends Card<ICardPreview> {
  imageElement: HTMLElement;

  constructor (container: HTMLElement) {
    super(container);
    this.imageElement = ensureElement<HTMLElement>(".card__image", this.container);
  }
}