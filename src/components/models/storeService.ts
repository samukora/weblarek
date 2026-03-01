import {
  TStore,
  IApi,
} from "/Users/mac/Documents/JavaScript/Practicum Yandex/Projects/weblarek/src/types/index";
import { Api } from "../base/Api";
import { API_URL } from "../../utils/constants";

export class StoreService {
  api: IApi = new Api(API_URL);

  constructor() {}

  async getData() {
    const response = await this.api.get("/product");
    return response;
  }

  async postOrder(data: TStore) {
    const result = await this.api.post("/order", data, "POST");
    return result;
  }
}
