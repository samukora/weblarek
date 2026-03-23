import { Card } from "./Card";
import { ICard} from "../../types";
import { ensureElement } from "../../utils/utils";
import { CDN_URL } from "../../utils/constants";

interface ICardCatalog extends ICard {
  imageElement: HTMLElement;
  categoryElement: HTMLElement;
}

interface ICardActions {
  onClick: () => void;
}

export class CardCatalog extends Card<ICardCatalog> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor (container: HTMLElement, actions: ICardActions) {
    super(container,);
    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);

    this.container.addEventListener("click", actions.onClick)
  }

  
  set category(value: string){
    this.categoryElement.textContent = value;
  }
  
  set image(value: string) {
    this.setImage(this.imageElement, `${CDN_URL}/${value}`, value)
  }
  
}