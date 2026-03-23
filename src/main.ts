import "./scss/styles.scss";
import { Basket } from "./components/models/basket";
import { Catalog } from "./components/models/catalog";
import { Customer } from "./components/models/customer";
import { StoreService } from "./components/models/storeService";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { Header } from "./components/view/Header";
import { BasketView } from "./components/view/BasketView";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Gallery } from "./components/view/Gallery";
import { CardCatalog, ICardCatalog } from "./components/view/CardCatalog";
import { Modal } from "./components/view/Modal";
import { CardBasket } from "./components/view/CardBasket";
import { ICustomer, IOrderResponse, IProduct } from "./types";
import { CardPreview } from "./components/view/CardPreview";
import { FormOrder } from "./components/view/FormOrder";
import { FormContacts } from "./components/view/FormContacts";
import { Success } from "./components/view/Success";

//---- init eventEmmitter ----//
const eventEmitter = new EventEmitter();

//---- init model ----//
const customer = new Customer(eventEmitter);
const catalog = new Catalog(eventEmitter);
const basketList = new Basket(eventEmitter);

//----  init templates ----//
const galleryCardTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const basketCardTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const previewCardTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const successTemplate = ensureElement<HTMLTemplateElement>("#success");

//---- init view ----//
const gallery = new Gallery(ensureElement(".gallery"));
const cardPreview = new CardPreview(previewCardTemplate, {
  onClick: () => {
    eventEmitter.emit("????");
  },
});
// const gallery = new Gallery(ensureElement(".gallery"));
// const headerElement = ensureElement(".header");
// const header = new Header(headerElement, {
//   onClick: () => eventEmitter.emit("basket:open"),
// });
// const basket = new BasketView(cloneTemplate(basketTemplate), {
//   onClick: () => eventEmitter.emit("basket:order"),
// });
const modalWindow = Modal.initModal(ensureElement("#modal-container"), {
  onClick: () => eventEmitter.emit("modal:close"),
});
// const formOrder = new FormOrder(cloneTemplate(orderTemplate), {
//   onClick: () => {
//     eventEmitter.emit("order:submit");
//   },
//   onPaymentChange: (event: Event) => {
//     const button = event.target as HTMLButtonElement;
//     eventEmitter.emit("order:change", { payment: button.name });
//   },
//   onAddressChange: (event: Event) => {
//     const input = event.target as HTMLInputElement;
//     eventEmitter.emit("order:change", { address: input.value });
//   },
// });
// const formContacts = new FormContacts(cloneTemplate(contactsTemplate), {
//   onClick: () => {
//     eventEmitter.emit("contacts:submit");
//   },
//   onContactsChange: (event: Event) => {
//     const input = event.target as HTMLInputElement;
//     eventEmitter.emit("contacts:change", { [input.name]: input.value });
//   },
// });

//---- subscribe on events eventEmitter ----//

eventEmitter.on("catalog:change", () => {
  gallery.galleryList = catalog.getList().map((elem) => {
    const card = new CardCatalog(cloneTemplate(galleryCardTemplate), {
      onClick: () => {
        eventEmitter.emit("card:select", elem);
      },
    });
    return card.render(elem);
  });
});

eventEmitter.on("card:select", (item: IProduct) => {
  catalog.setCurrentProduct(item.id);
}); 

eventEmitter.on("card:preview", () => {
  if (catalog.getCurrentProductDetails() !== null) {
    modalWindow.content = cardPreview.render(catalog.getCurrentProductDetails());
    modalWindow.open();
  }
});

// eventEmitter.on("card:select", (item: IProduct) => {
//   catalog.setCurrentProduct(item.id);
//   eventEmitter.emit("card:preview");
// });

// eventEmitter.on("card:preview", () => {
//   const item = catalog.getCurrentProductDetails();
//   if (item) {
//     let actionType: string = "card:buy";
//     const buttonDisable: boolean = item.price ? false : true;
//     let buttonText: string = buttonDisable ? "Недоступно" : "Купить";

//     if (basketList.checkAvailability(item.id)) {
//       actionType = "card:remove";
//       buttonText = "Удалить и корзины";
//     }

//     const template = cloneTemplate(previewCardTemplate);
//     const card = new CardPreview(template, {
//       onClick: () => {
//         eventEmitter.emit(actionType, item);
//       },
//     });
//     card.buttonDisable = buttonDisable;
//     card.buttonText = buttonText;
//     modalWindow.content = card.render();
//     modalWindow.open();
//   }
// });

// eventEmitter.on("catalog:change", () => {
//   gallery.galleryListElement = catalog.getList();
// })

// eventEmitter.on("basket:open", () => {
//   const list = basketList.getList();
//   const newList = list.map((elem) => {
//     const template = cloneTemplate(basketCardTemplate);
//     const card = new CardBasket(template, {
//       onClick: () => eventEmitter.emit("basketCard:remove", elem),
//     });
//     return card.render();
//   });

//   basket.buttonDisable = basketList.getTotalCount() > 0 ? false : true;
//   basket.basket = newList;

//   modalWindow.content = basket.render();
//   modalWindow.open();
// });

// eventEmitter.on("modal:close", () => {
//   modalWindow.close();
// });

// eventEmitter.on("catalog:change", () => {
//   const list = catalog.getList();
//   const newList = list.map((elem) => {
//     const template = cloneTemplate(galleryCardTemplate);
//     const card = new CardCatalog(template, {
//       onClick: () => {
//         eventEmitter.emit("card:select", elem);
//       },
//     });
//     return card.render();
//   });

//   gallery.galleryListElement = newList;
//   gallery.render();
// });

// eventEmitter.on("card:select", (item: IProduct) => {
//   catalog.setCurrentProduct(item.id);
//   eventEmitter.emit("card:preview");
// });

// eventEmitter.on("card:preview", () => {
//   const item = catalog.getCurrentProductDetails();
//   if (item) {
//     let actionType: string = "card:buy";
//     const buttonDisable: boolean = item.price ? false : true;
//     let buttonText: string = buttonDisable ? "Недоступно" : "Купить";

//     if (basketList.checkAvailability(item.id)) {
//       actionType = "card:remove";
//       buttonText = "Удалить и корзины";
//     }

//     const template = cloneTemplate(previewCardTemplate);
//     const card = new CardPreview(template, {
//       onClick: () => {
//         eventEmitter.emit(actionType, item);
//       },
//     });
//     card.buttonDisable = buttonDisable;
//     card.buttonText = buttonText;
//     modalWindow.content = card.render();
//     modalWindow.open();
//   }
// });

// eventEmitter.on("card:buy", () => {
//   const item = catalog.getCurrentProductDetails();
//   if (item) {
//     basketList.addItem(item);
//     eventEmitter.emit("counter:update");
//     eventEmitter.emit("amount:update");
//   }
//   eventEmitter.emit("card:preview");
// });

// eventEmitter.on("card:remove", () => {
//   const item = catalog.getCurrentProductDetails();
//   if (item) {
//     basketList.removeItem(item);
//     eventEmitter.emit("counter:update");
//     eventEmitter.emit("amount:update");
//   }
//   eventEmitter.emit("card:preview");
// });

// eventEmitter.on("counter:update", () => {
//   header.counter = basketList.getTotalCount();
//   header.render();
// });

// eventEmitter.on("amount:update", () => {
//   basket.totalAmount = basketList.getTotalAmount();
//   basket.render();
// });

// eventEmitter.on("basketCard:remove", (item: IProduct) => {
//   basketList.removeItem(item);
//   eventEmitter.emit("basket:open");
// });

// eventEmitter.on("basket:order", () => {
//   modalWindow.content = formOrder.render();
// });

// eventEmitter.on("order:change", (buyer: ICustomer) => {
//   customer.setInfo(buyer);
//   formOrder.payment = buyer.payment;
//   eventEmitter.emit("order:validate");
// });

// eventEmitter.on("order:validate", () => {
//   const result = customer.validateInfo();

//   formOrder.canContinue = result.address || result.payment ? true : false;
//   formOrder.errors = Object.fromEntries(
//     Object.entries(result).filter(
//       (elem) => elem[0] === "address" || elem[0] === "payment",
//     ),
//   );

//   formOrder.render();
// });

// eventEmitter.on("order:submit", () => {
//   modalWindow.content = formContacts.render();
// });

// eventEmitter.on("contacts:change", (buyer: ICustomer) => {
//   customer.setInfo(buyer);
//   eventEmitter.emit("contacts:validate");
// });

// eventEmitter.on("contacts:validate", () => {
//   const result = customer.validateInfo();

//   formContacts.canContinue = result.email || result.phone ? true : false;
//   formContacts.errors = Object.fromEntries(
//     Object.entries(result).filter(
//       (elem) => elem[0] === "email" || elem[0] === "phone",
//     ),
//   );

//   formContacts.render();
// });

// eventEmitter.on("contacts:submit", () => {
//   try {
//     const items = basketList.getList().map((elem) => elem.id);
//     const order = Object.assign({}, customer, {
//       total: basketList.getTotalAmount(),
//       items: items,
//     });
//     store.postOrder(order).then((response: IOrderResponse) => {
//       const success = new Success(cloneTemplate(successTemplate), {
//         onClick: () => {
//           basketList.clearBasket();
//           eventEmitter.emit("counter:update");
//           eventEmitter.emit("amount:update");
//           eventEmitter.emit("modal:close");
//         },
//       });
//       success.totalAmount = response.total;
//       modalWindow.content = success.render();
//     });
//   } catch (err) {
//     throw err;
//   }
// });
//---- run ----//
const api = new Api(API_URL);
const store = new StoreService(api);

try {
  catalog.setList(await store.getData());
} catch (err) {
  console.log("Не удалось запросить данные с сервера.")
}
