export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface ICustomer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type TPayment = "card" | "cash" | "";

export type TCustomerErrors = Partial<Record<keyof ICustomer, string>>;

export interface IOrder extends ICustomer {
  total: number;
  items: string[];
}

export type IProductResponse = {
  total: number;
  items: IProduct[];
}

export type IOrderResponse = {
  id: string;
  total: number;
}

export interface ICard {
  titleElement: HTMLElement;
  priceElement: HTMLElement;
}

export interface ICardPreview extends ICard {
  imageElement: HTMLElement;
}

export interface ICardCatalog extends ICardPreview {
  categoryElement: HTMLElement;
  descriptionElement: HTMLElement;
}

export interface IHeader {
  counter: number;
  counterElement: HTMLElement;
  basketElement: HTMLButtonElement;
}

export interface IFormOrder {
  paymentElement: HTMLElement;
  addressElement: HTMLElement;
}

export interface IFormContacts {
  emailElement: HTMLElement;
  phoneelement: HTMLElement;
}

export interface IModal {
  modalContentElement: HTMLElement;
}