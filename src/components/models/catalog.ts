import { IProduct } from "../../../src/types/index";

export class Catalog {
  private listOfProducts: IProduct[] = [];
  private currentProduct: IProduct | null = null;

  constructor() {
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
    }
  }

  setList(list: IProduct[]): void {
    this.listOfProducts = list;
  }
}
