import {
  IProductResponse,
  IOrderResponse,
  IOrder,
  IApi,
  IProduct,
} from "../../../src/types/index";

export class StoreService {
  apiService;

  constructor(api: IApi) {
    this.apiService = api;
  }

  async getData(): Promise<IProduct[]> {
    try {
      const response = await this.apiService.get<IProductResponse>("/product");
      return response.items;
    } catch (err) {
      throw err;
    }
  }

  async postOrder(data: IOrder): Promise<IOrderResponse> {
    try {
      return await this.apiService.post<IOrderResponse>("/order", data, "POST");
    } catch (err) {
      throw err;
    }
  }
}
