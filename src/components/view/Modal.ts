import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IModal {
  modalContentElement: HTMLElement;
}

export class Modal extends Component<IModal> {
  private modalContentElement: HTMLElement;
  private closeElement: HTMLElement;
  constructor(container: HTMLElement) {
    super(container);

    this.modalContentElement = ensureElement<HTMLElement>(
      ".modal__content",
      this.container,
    );
    this.closeElement = ensureElement<HTMLElement>(
      ".modal__close",
      this.container,
    );

    this.closeElement.addEventListener("click", () => this.close());
    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) this.close();
    });
  }

  set content(child: HTMLElement) {
    this.modalContentElement.replaceChildren(child);
  }

  open() {
    this.container.classList.add("modal_active");
  }

  close() {
    this.container.classList.remove("modal_active");
  }
}
