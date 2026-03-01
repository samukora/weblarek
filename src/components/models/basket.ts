import { TProduct } from "/Users/mac/Documents/JavaScript/Practicum Yandex/Projects/weblarek/src/types/index";

export class Basket {
  private _listOfProducts: TProduct[] = [];

  constructor() {}

  get listOfProducts () {
    return this.getList();
  }

  addItem(item: TProduct): void {
    this._listOfProducts.push(item);
  }

  removeItem(item: TProduct): boolean {
    const indexOfElement = this._listOfProducts.findIndex(
      (elem) => elem.id === item.id,
    );

    if (indexOfElement >= 0) {
      this._listOfProducts.splice(indexOfElement, 1);
      return true;
    }
    return false;
  }

  getTotalCount(): number {
    return this._listOfProducts.length;
  }

  getList(): TProduct[] {
    return [...this._listOfProducts];
  }

  getTotalAmount(): number {
    return this._listOfProducts.reduce(
      (acc, elem) => (acc += elem.price || 0),
      0,
    );
  }

  checkAvailability(id: string): boolean {
    return this._listOfProducts.find((elem) => elem.id === id) ? false : true;
  }

  clearBasket(): void {
    this._listOfProducts = [];
  }
}
