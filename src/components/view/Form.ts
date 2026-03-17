import { Component } from "../base/Component";

export abstract class Form<T> extends Component<T> {
  constructor(container: HTMLElement) {
    super(container)
  }
}