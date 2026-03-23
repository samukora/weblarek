import { Component } from "../base/Component";
import { IActions } from "../../types";
import { ensureElement } from "../../utils/utils";

interface IModal {
  modalContentElement: HTMLElement;
}

export class Modal extends Component<IModal> {
  private modalContentElement: HTMLElement;
  private closeElement: HTMLElement;
  private constructor(container: HTMLElement, actions: IActions) {
    super(container);
    
    this.modalContentElement = ensureElement<HTMLElement>(".modal__content", this.container)
    this.closeElement = ensureElement<HTMLElement>(".modal__close", this.container)

    this.closeElement.addEventListener("click", actions.onClick);
    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) 
        this.close();
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