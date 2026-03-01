export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface TProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface TCustomer {
  payment?: TPayment;
  email?: string;
  phone?: string;
  address?: string;
}

export type TPayment = "card" | "cash" | "";

export interface TCustomerErrors {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface TStore extends TCustomer {
  total: number;
  items: string[] | TProduct[];
}
