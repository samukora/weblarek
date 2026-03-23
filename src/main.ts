import "./scss/styles.scss";
import { Basket } from "./components/models/basket";
import { Catalog } from "./components/models/catalog";
import { Customer } from "./components/models/customer";
import { StoreService } from "./components/models/storeService";
import { apiProducts } from "./utils/data";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { Header } from "./components/view/Header";
import { BasketView } from "./components/view/Basket";

import { cloneTemplate, ensureElement } from "./utils/utils";
import { Gallery } from "./components/view/Gallery";
import { CardCatalog } from "./components/view/CardCatalog";
import { Modal } from "./components/view/Modal";
import { CardBasket } from "./components/view/CardBasket";
import { ICustomer, IProduct } from "./types";
import { CardPreview } from "./components/view/CardPreview";
import { FormOrder } from "./components/view/FormOrder";
import { FormContacts } from "./components/view/FormContacts";
import { Success } from "./components/view/Success";

//---- init eventEmmitter ----//
const eventEmitter = new EventEmitter();
//const presenter = new Presenter();

//---- init model ----//
const customer = new Customer();
const catalog = new Catalog();
const basketList = new Basket();

//----  init templates ----//
const galleryCardTemplate = document.querySelector(
  "#card-catalog",
) as HTMLTemplateElement;
const basketTemplate = document.querySelector("#basket") as HTMLTemplateElement;
const basketCardTemplate = document.querySelector(
  "#card-basket",
) as HTMLTemplateElement;
const previewCardTemplate = document.querySelector(
  "#card-preview",
) as HTMLTemplateElement;

const orderTemplate = document.querySelector("#order") as HTMLTemplateElement;

const contactsTemplate = document.querySelector(
  "#contacts",
) as HTMLTemplateElement;

const successTemplate = document.querySelector(
  "#success",
) as HTMLTemplateElement; 

//---- init view ----//
const gallery = new Gallery(ensureElement(".gallery"), eventEmitter);
const headerElement = ensureElement(".header");
const header = new Header(headerElement, {
  onClick: () => eventEmitter.emit("basket:open"),
});
const basket = new BasketView(cloneTemplate(basketTemplate), {
  onClick: () => eventEmitter.emit("basket:order"),
});
const modalWindow = Modal.initModal(ensureElement("#modal-container"), {
  onClick: () => eventEmitter.emit("modal:close"),
});
const formOrder = new FormOrder(cloneTemplate(orderTemplate), {
  onClick: () => {
    eventEmitter.emit("order:submit");
  },
  onPaymentChange: (event: Event) => {
    const button = event.target as HTMLButtonElement;
    eventEmitter.emit("order:change", { payment: button.name });
  },
  onAddressChange: (event: Event) => {
    const input = event.target as HTMLInputElement;
    eventEmitter.emit("order:change", { address: input.value });
  },
});
const formContacts = new FormContacts(cloneTemplate(contactsTemplate), {
  onClick: () => {
    eventEmitter.emit("contacts:submit");
  },
  onContactsChange: (event: Event) => {
    const input = event.target as HTMLInputElement;
    eventEmitter.emit("contacts:change", {[input.name]: input.value});
  },
});

//---- subscribe on events eventEmitter ----//

eventEmitter.on("basket:open", () => {
  const list = basketList.getList();
  const newList = list.map((elem) => {
    const template = cloneTemplate(basketCardTemplate);
    const card = new CardBasket(template, {
      onClick: () => eventEmitter.emit("basketCard:remove", elem),
    });
    return card.render(elem);
  });

  basket.buttonDisable = basketList.getTotalCount() > 0 ? false : true;
  basket.basket = newList;

  modalWindow.content = basket.render();
  modalWindow.open();
});

eventEmitter.on("modal:close", () => {
  modalWindow.close();
});

eventEmitter.on("catalog:change", () => {
  const list = catalog.getList();
  const newList = list.map((elem) => {
    const template = cloneTemplate(galleryCardTemplate);
    const card = new CardCatalog(template, {
      onClick: () => {
        eventEmitter.emit("card:select", elem);
      },
    });
    return card.render(elem);
  });

  gallery.galleryListElement = newList;
  gallery.render();
});

eventEmitter.on("card:select", (item: IProduct) => {
  catalog.setCurrentProduct(item.id);
  eventEmitter.emit("card:preview");
});

eventEmitter.on("card:preview", () => {
  const item = catalog.getCurrentProductDetails();
  if (item) {
    let actionType: string = "card:buy";
    const buttonDisable: boolean = item.price ? false : true;
    let buttonText: string = buttonDisable ? "Недоступно" : "Купить";

    if (basketList.checkAvailability(item.id)) {
      actionType = "card:remove";
      buttonText = "Удалить и корзины";
    }

    const template = cloneTemplate(previewCardTemplate);
    const card = new CardPreview(template, {
      onClick: () => {
        eventEmitter.emit(actionType, item);
      },
    });
    card.buttonDisable = buttonDisable;
    card.buttonText = buttonText;
    modalWindow.content = card.render(item);
    modalWindow.open();
  }
});

eventEmitter.on("card:buy", () => {
  const item = catalog.getCurrentProductDetails();
  if (item) {
    basketList.addItem(item);
    eventEmitter.emit("counter:update");
    eventEmitter.emit("amount:update");
  }
  eventEmitter.emit("card:preview");
});

eventEmitter.on("card:remove", () => {
  const item = catalog.getCurrentProductDetails();
  if (item) {
    basketList.removeItem(item);
    eventEmitter.emit("counter:update");
    eventEmitter.emit("amount:update");
  }
  eventEmitter.emit("card:preview");
});

eventEmitter.on("counter:update", () => {
  header.counter = basketList.getTotalCount();
  header.render();
});

eventEmitter.on("amount:update", () => {
  basket.totalAmount = basketList.getTotalAmount();
  basket.render();
});

eventEmitter.on("basketCard:remove", (item: IProduct) => {
  basketList.removeItem(item);
  eventEmitter.emit("basket:open");
});

eventEmitter.on("basket:order", () => {
  modalWindow.content = formOrder.render();
});

eventEmitter.on("order:change", (buyer: ICustomer) => {
  customer.setInfo(buyer);
  formOrder.payment = buyer.payment;
  eventEmitter.emit("order:validate");
});

eventEmitter.on("order:validate", () => {
  const result = customer.validateInfo();

  formOrder.canContinue = result.address || result.payment ? true : false;
  formOrder.errors = Object.fromEntries(
    Object.entries(result)
      .filter(elem => (elem[0] === 'address' || elem[0] === 'payment')
    )
  );

  formOrder.render();
});

eventEmitter.on("order:submit", () => {
  modalWindow.content = formContacts.render();
});

eventEmitter.on ("contacts:change", (buyer: ICustomer)  => {
  customer.setInfo(buyer);
  eventEmitter.emit("contacts:validate");
});

eventEmitter.on("contacts:validate", () => {
  const result = customer.validateInfo();

  formContacts.canContinue = result.email || result.phone ? true : false;
  formContacts.errors = Object.fromEntries(
    Object.entries(result)
      .filter(elem => (elem[0] === 'email' || elem[0] === 'phone')
    )
  );

  formContacts.render();
});

eventEmitter.on("contacts:submit", () => {

  const success = new Success(cloneTemplate(successTemplate), {
    onClick: () => {
      basketList.clearBasket();
      eventEmitter.emit("counter:update");
      eventEmitter.emit("amount:update");
      eventEmitter.emit("modal:close")
    }
  });
  success.totalAmount = basketList.getTotalAmount();

  modalWindow.content = success.render();
});
//---- run ----//
const api = new Api(API_URL);
const store = new StoreService(api);

try {
  const catalogItems = await store.getData();
  catalog.setList(catalogItems);
  eventEmitter.emit("catalog:change");
} catch (err) {
  throw err;
}

// console.log("--- Test Catalog ---");
// testCatalog.setList(apiProducts.items);
// testCatalog.setCurrentProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
// console.log("Catalog:", testCatalog.getList());
// console.log("CurrentProductDetails", testCatalog.getCurrentProductDetails());

// console.log("--- Test Basket ---");

// let currentItem = testCatalog.getCurrentProductDetails();
// if (currentItem) testBasket.addItem(currentItem);
// testCatalog.setCurrentProduct("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
// currentItem = testCatalog.getCurrentProductDetails();
// if (currentItem) testBasket.addItem(currentItem);
// console.log("Basket:", testBasket.getList());
// console.log(
//   "Availability of '854cef69-976d-4c2a-a18c-2aa45046c390':",
//   testBasket.checkAvailability("854cef69-976d-4c2a-a18c-2aa45046c390"),
// );
// console.log(
//   "Availability of 'b06cde61-912f-4663-9751-09956c0eed67':",
//   testBasket.checkAvailability("b06cde61-912f-4663-9751-09956c0eed67"),
// );
// console.log("Total amount in basket:", testBasket.getTotalAmount());
// console.log("Total count of products in basket:", testBasket.getTotalCount());
// if (currentItem) testBasket.removeItem(currentItem);
// console.log(
//   "Basket after deleting '412bcf81-7e75-4e70-bdb9-d3c73c9803b7':",
//   testBasket.getList(),
// );
// testBasket.clearBasket();
// console.log("Basket after deleting all:", testBasket.getList());

// console.log("---Test customer ---");

// testCustomer.setInfo({ payment: 'card', email: '', phone: '', address: '' });
// console.log("Customer info (add payment):", testCustomer.getInfo());
// testCustomer.setInfo({ payment: '', email: '', phone: '+74959379992', address: '' });
// console.log("Customer info (add phone):", testCustomer.getInfo());
// console.log("Validate errors:", testCustomer.validateInfo());
// testCustomer.setInfo({ payment: 'card', email: 'email@ddd.com', phone: '+74959379993', address: 'Private  st.' });
// console.log("Customer info (add all data):", testCustomer.getInfo());
// console.log("Validate correct:", testCustomer.validateInfo());
// testCustomer.clearInfo();
// console.log("Customer info (after clear):", testCustomer.getInfo());
// console.log("Validate errors (after clear):", testCustomer.validateInfo());

// console.log("---Test StoreService ---");

// const api = new Api(API_URL);
// const testStore = new StoreService(api);

// try {
//   const catalogItems = (await testStore.getData());
//   testCatalog.setList(catalogItems);
//   console.log("Catalog API:", testCatalog.getList());
// }
// catch (err) {
//   throw err;
// }
