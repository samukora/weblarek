import "./scss/styles.scss";
import { Basket } from "./components/models/basket";
import { Catalog } from "./components/models/catalog";
import { Customer } from "./components/models/customer";
import { StoreService } from "./components/models/storeService";
import { apiProducts } from "./utils/data";
import { TCustomer, TStore, TProduct } from "./types";

const testBasket = new Basket();
const testCatalog = new Catalog();
const testCustomer = new Customer();

testCatalog.setList(apiProducts.items);
testCatalog.setCurrentProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
console.log("Catalog:", testCatalog.getList());
console.log("CurrentProductDetails", testCatalog.getCurrentProductDetails());
console.log("-------");

let currentItem = testCatalog.getCurrentProductDetails();
if (currentItem) testBasket.addItem(currentItem);

testCatalog.setCurrentProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
currentItem = testCatalog.getCurrentProductDetails();
if (currentItem) testBasket.addItem(currentItem);

console.log("Basket:", testBasket.getList());
console.log(
  "Availability of '854cef69-976d-4c2a-a18c-2aa45046c390':",
  testBasket.checkAvailability("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
console.log(
  "Availability of 'b06cde61-912f-4663-9751-09956c0eed67':",
  testBasket.checkAvailability("b06cde61-912f-4663-9751-09956c0eed67"),
);
console.log("Total amount in basket:", testBasket.getTotalAmount());
console.log("Total count of products in basket:", testBasket.getTotalCount());
if (currentItem) testBasket.removeItem(currentItem);
console.log(
  "Basket after deleting '412bcf81-7e75-4e70-bdb9-d3c73c9803b7':",
  testBasket.getList(),
);
//testBasket.clearBasket();
console.log("Basket after deleting all:", testBasket.getList());

console.log("-------");

const cust: TCustomer = {
  payment: "card",
  email: "ggg@gg",
  address: "",
  phone: "+74959379992",
};

testCustomer.setInfo(cust);
console.log("Customer info:", testCustomer.getInfo());
console.log("Validate errors:", testCustomer.validateInfo());

console.log("-------");

const order: TStore = Object.assign({}, cust) as TStore;
order.total = testBasket.getTotalAmount();
order.items = [];
testBasket.getList().forEach((item, index) => (order.items[index] = item.id));

const testStore = new StoreService();

const response = (await testStore.getData()) as TStore;
const items = response.items as TProduct[];
testCatalog.setList(items);

console.log("Catalog: ", testCatalog.getList());
