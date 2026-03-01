import { TProduct } from "/Users/mac/Documents/JavaScript/Practicum Yandex/Projects/weblarek/src/types/index";

export class Catalog {
  private _listOfProducts: TProduct[] = [];
  private _currentProduct: TProduct | null = null;

  constructor() {}

  get listOfProducts() {
    return this.getList();
  }

  get currentProduct() {
    return this.getCurrentProductDetails();
  }

  getList(): TProduct[] {
    return [...this._listOfProducts];
  }

  getCurrentProductDetails(): TProduct | null {
    return { ...this._currentProduct } as TProduct;
  }

  getItem(id: string): TProduct | null {
    return this._listOfProducts.find((elem) => elem.id === id) || null;
  }

  setCurrentProduct(id: string): boolean {
    const currentProduct = this.getItem(id);
    if (currentProduct) {
      this._currentProduct = currentProduct;
      return true;
    }
    return false;
  }

  setList(list: TProduct[]): void {
    this._listOfProducts = [...list];
  }
}
