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
  protected imageElement: HTMLElement;

  constructor (container: HTMLElement, actions: ICardActions) {
    super(container,);
    this.imageElement = ensureElement<HTMLElement>(".card__image", this.container);
    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);

    this.container.addEventListener("click", actions.onClick)
  }

  
  set category(value: string){
    this.categoryElement.textContent = value;
  }
  
  set image(value: string) {
    this.imageElement.setAttribute("src", `${CDN_URL}/${value}`);
    this.imageElement.setAttribute("alt", value);
  }

  
}