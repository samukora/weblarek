import "./scss/styles.scss";
import { Basket } from "./components/models/basket";
import { Catalog } from "./components/models/catalog";
import { Customer } from "./components/models/customer";
import { StoreService } from "./components/models/storeService";
import { apiProducts } from "./utils/data";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";


const testCatalog = new Catalog();

console.log("--- Test Catalog ---");
testCatalog.setList(apiProducts.items);
testCatalog.setCurrentProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
console.log("Catalog:", testCatalog.getList());
console.log("CurrentProductDetails", testCatalog.getCurrentProductDetails());

console.log("--- Test Basket ---");
const testBasket = new Basket();

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
testBasket.clearBasket();
console.log("Basket after deleting all:", testBasket.getList());

console.log("---Test customer ---");

const testCustomer = new Customer();
testCustomer.setInfo({ payment: 'card', email: '', phone: '', address: '' });
console.log("Customer info (add payment):", testCustomer.getInfo());
testCustomer.setInfo({ payment: '', email: '', phone: '+74959379992', address: '' });
console.log("Customer info (add phone):", testCustomer.getInfo());
console.log("Validate errors:", testCustomer.validateInfo());
testCustomer.setInfo({ payment: 'card', email: 'email@ddd.com', phone: '+74959379993', address: 'Private  st.' });
console.log("Customer info (add all data):", testCustomer.getInfo());
console.log("Validate correct:", testCustomer.validateInfo());
testCustomer.clearInfo();
console.log("Customer info (after clear):", testCustomer.getInfo());
console.log("Validate errors (after clear):", testCustomer.validateInfo());

console.log("---Test StoreService ---");

const api = new Api(API_URL);
const testStore = new StoreService(api);

try {
  const catalogItems = (await testStore.getData());
  testCatalog.setList(catalogItems);
  console.log("Catalog API:", testCatalog.getList());
}
catch (err) {
  throw err;
}