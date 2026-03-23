import { Component } from "../base/Component";

interface IGallery {
  galleryList: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  constructor(container: HTMLElement) {
    super(container);
  }

  set galleryList(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}
