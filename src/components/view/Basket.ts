import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
    basketListElements: HTMLElement[];
}

export class BasketView extends Component<IBasket> {
    eventEmmiter: IEvents;
    basketListElements: HTMLElement;

    constructor(container: HTMLElement, eventEmmiter: IEvents) {
        super(container);
        this.eventEmmiter = eventEmmiter;
        this.basketListElements = ensureElement(".basket__list", this.container);
    }

    set basket(items: HTMLElement[]) {
        this.basketListElements.replaceChildren(...items);
    }

}