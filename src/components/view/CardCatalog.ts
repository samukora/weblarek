import { Card } from "./Card";
import { ICard} from "../../types";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/Events";

 interface ICardCatalog extends ICard {
  imageElement: HTMLElement;
  categoryElement: HTMLElement;
}

export class CardCatalog extends Card<ICardCatalog> {
  protected imageElement: HTMLElement;
  protected categoryElement: HTMLElement;

  constructor (container: HTMLElement, eventEmitter: EventEmitter) {
    super(container, eventEmitter);
    this.imageElement = ensureElement<HTMLElement>(".card__image", this.container);
    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);

    this.container.addEventListener("click", () => {
      this.eventEmitter.emit("card:preview");
    })
  }

  set image(value: string) {
    this.imageElement.setAttribute("src", value);
    this.imageElement.setAttribute("alt", this.titleElement.textContent);
  }

  set category(value: string){
    this.categoryElement.textContent = value;
  }


  
}