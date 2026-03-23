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
    const response = await this.apiService.get<IProductResponse>("/product");
    return response.items;
  }

  async postOrder(data: IOrder): Promise<IOrderResponse> {
    return await this.apiService.post<IOrderResponse>("/order", data, "POST");
  }
}
