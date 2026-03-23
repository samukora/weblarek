import { IProduct } from "../../../src/types/index";
import { IEvents } from "../base/Events";

export class Catalog {
  private listOfProducts: IProduct[] = [];
  private currentProduct: IProduct | null = null;
  private eventEmitter: IEvents;

  constructor(eventEmitter: IEvents) {
    this.eventEmitter = eventEmitter;
  }

  getList(): IProduct[] {
    return [...this.listOfProducts];
  }

  getCurrentProductDetails(): IProduct | null {
    return this.currentProduct;
  }

  getItem(id: string): IProduct | null {
    return this.listOfProducts.find((elem) => elem.id === id) || null;
  }

  setCurrentProduct(id: string): void {
    const currentProduct = this.getItem(id);
    if (currentProduct) {
      this.currentProduct = currentProduct;
      this.eventEmitter.emit("card:preview");
    }
  }

  setList(list: IProduct[]): void {
    this.listOfProducts = list;
    this.eventEmitter.emit("catalog:change");
  }
}
