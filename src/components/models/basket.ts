import { IProduct } from "../../../src/types/index";

export class Basket {
  private listOfProducts: IProduct[] = [];

  constructor() { }

  addItem(item: IProduct): void {
    this.listOfProducts.push(item);
  }

  removeItem(item: IProduct): void {
    const indexOfElement = this.listOfProducts.findIndex(
      (elem) => elem.id === item.id,
    );

    if (indexOfElement >= 0) {
      this.listOfProducts.splice(indexOfElement, 1);
    }
  }

  getTotalCount(): number {
    return this.listOfProducts.length;
  }

  getList(): IProduct[] {
    return [...this.listOfProducts];
  }

  getTotalAmount(): number {
    return this.listOfProducts.reduce(
      (acc, elem) => (acc += elem.price || 0),
      0,
    );
  }

  checkAvailability(id: string): boolean {
    return this.listOfProducts.some((elem) => elem.id === id);
  }

  clearBasket(): void {
    this.listOfProducts = [];
  }
}
