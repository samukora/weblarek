import { Component } from "../base/Component";

interface IGallery {
  galleryListElement: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  constructor(container: HTMLElement) {
    super(container);
  }

  set galleryListElement(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}
