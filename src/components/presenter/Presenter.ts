import { EventEmitter } from "../base/Events"

import { Basket } from "../models/basket";
import { Catalog } from "../models/catalog";
import { Customer } from "../models/customer";

import { IHeader } from "../view/Header";

export class Presenter{
    eventEmmitter: EventEmitter | null = null;
    header: IHeader;
    basket: Basket;
    catalog: Catalog;
    customer: Customer;

    constructor(
        header: IHeader,
        basket: Basket,
        catalog: Catalog,
        customer: Customer,
    ) {
        this.header = header;
        this.basket =  basket;
        this.catalog = catalog;
        this.customer = customer;
        this.eventEmmitter = new EventEmitter();
    }



}