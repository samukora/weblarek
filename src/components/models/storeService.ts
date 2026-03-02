import {
  IStore,
  IApi,
  IProduct
} from "../../../src/types/index";

export class StoreService {
  apiService;
  
  constructor(api: IApi) {
    this.apiService = api;
  }

  async getData(): Promise<IProduct[]> {
    try {
      const response: IStore = await this.apiService.get("/product");
      return response.items;
    }
    catch (err) {
      throw err;
    }
  }

  async postOrder(data: IStore): Promise<IStore> {
    try  {
      return await this.apiService.post("/order", data, "POST");
    }
    catch (err) {
      throw err;
    }
  }
}
