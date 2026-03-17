import { Component } from "../base/Component";
import { IModal } from "../../types";
import { ensureElement } from "../../utils/utils";

export class Modal extends Component<IModal> {
  modalContentElement: HTMLElement;
  private constructor(container: HTMLElement) {
    super(container);
    
    this.modalContentElement = ensureElement(".modal__content", this.container)
  }
}