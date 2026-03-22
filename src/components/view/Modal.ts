import { Component } from "../base/Component";
import { IActions } from "../../types";
import { ensureElement } from "../../utils/utils";

interface IModal {
  modalContentElement: HTMLElement;
}

export class Modal extends Component<IModal> {
  private modalContentElement: HTMLElement;
  private closeElement: HTMLElement;
  private constructor(container: HTMLElement, action: IActions) {
    super(container);
    
    this.modalContentElement = ensureElement(".modal__content", this.container)
    this.closeElement = ensureElement(".modal__close", this.container)

    this.closeElement.addEventListener("click", () => {
      action.onClick();
    });
  }

  static initModal(container: HTMLElement, action: IActions) {
    return new Modal(container, action);
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