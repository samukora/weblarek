import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IGallery {
    galleryListElement: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
    eventEmmiter: IEvents;

    constructor(container: HTMLElement, eventEmmiter: IEvents) {
        super(container);
        this.eventEmmiter = eventEmmiter;
    }

    set galleryListElement(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}