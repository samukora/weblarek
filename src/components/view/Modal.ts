import { Component } from "../base/Component";
import { IModal } from "../../types";
import { ensureElement } from "../../utils/utils";

export class Modal extends Component<IModal> {
  private modalContentElement: HTMLElement;
  private closeElement: HTMLElement;
  private constructor(container: HTMLElement) {
    super(container);
    
    this.modalContentElement = ensureElement(".modal__content", this.container)
    this.closeElement = ensureElement(".modal__close", this.container)

    this.closeElement.addEventListener("click", () => {
      this.close();
    });
  }

  static initModal(container: HTMLElement) {
    return new Modal(container);
  }

  set content(div: HTMLElement) {
    this.modalContentElement.appendChild(div);
  }

  open() {
    this.container.classList.add("modal_active");
  }

  close() {
    this.container.classList.remove("modal_active");
  }
}