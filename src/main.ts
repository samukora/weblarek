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
import { CardCatalog } from "./components/view/CardCatalog";
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
const cardPreview = new CardPreview(cloneTemplate(previewCardTemplate), {
  onClick: () => {
    const currentProduct = catalog.getCurrentProductDetails()?.id;
    if (!currentProduct) {
      return;
    }
    basketList.checkAvailability(currentProduct)
      ? eventEmitter.emit("card:remove")
      : eventEmitter.emit("card:buy");
  },
});
const headerElement = ensureElement(".header");
const header = new Header(headerElement, {
  onClick: () => eventEmitter.emit("basket:open"),
});
const basket = new BasketView(cloneTemplate(basketTemplate), {
  onClick: () => eventEmitter.emit("basket:order"),
});
const modalWindow = new Modal(ensureElement("#modal-container"));
const formOrder = new FormOrder(cloneTemplate(orderTemplate), eventEmitter);
const formContacts = new FormContacts(cloneTemplate(contactsTemplate), eventEmitter);
const success = new Success(cloneTemplate(successTemplate), {
  onClick: () => {
    eventEmitter.emit("success:finish");
  },
});

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
  const currentProduct = catalog.getCurrentProductDetails();
  if (!currentProduct) {
    return;
  }
  const disableButton = !currentProduct.price;
  cardPreview.buttonDisable = disableButton;
  cardPreview.buttonText = disableButton
    ? "Недоступно"
    : basketList.checkAvailability(currentProduct.id)
      ? "Удалить из корзины"
      : "Купить";
  modalWindow.content = cardPreview.render(currentProduct);
  modalWindow.open();
});

eventEmitter.on("card:remove", (event: IProduct) => {
  const currentProduct = event || catalog.getCurrentProductDetails();
  if (!currentProduct) {
    return;
  }
  basketList.removeItem(currentProduct);
  if (!event) modalWindow.close();
});

eventEmitter.on("card:buy", () => {
  const currentProduct = catalog.getCurrentProductDetails();
  if (!currentProduct) {
    return;
  }
  basketList.addItem(currentProduct);
  modalWindow.close();
});

eventEmitter.on("basket:open", () => {
  modalWindow.content = basket.render();
  modalWindow.open();
});

eventEmitter.on("basket:change", () => {
  header.counter = basketList.getTotalCount();
  const basketCardList = basketList.getList().map((elem, index) => {
    const card = new CardBasket(cloneTemplate(basketCardTemplate), {
      onClick: () => eventEmitter.emit("card:remove", elem),
    });
    card.index = ++index;
    return card.render(elem);
  });

  basket.buttonDisable = basketList.getTotalCount() > 0 ? false : true;
  basket.totalAmount = basketList.getTotalAmount();
  basket.basket = basketCardList;
});

eventEmitter.on("customer:change", (buyer: ICustomer) => {
  customer.setInfo(buyer);
});

eventEmitter.on("order:change", () => {
  formOrder.payment = customer.payment;

  const result = customer.validateInfo();
  formOrder.canContinue = result.address || result.payment ? true : false;
  formOrder.errors = Object.fromEntries(
    Object.entries(result).filter(
      (elem) => elem[0] === "address" || elem[0] === "payment",
    ),
  );
});

eventEmitter.on("contacts:change", () => {
  const result = customer.validateInfo();
  formContacts.canContinue = result.email || result.phone ? true : false;
  formContacts.errors = Object.fromEntries(
    Object.entries(result).filter(
      (elem) => (elem[0] === "email") || (elem[0] === "phone"),
    ),
  );
});

eventEmitter.on("basket:order", () => {
  modalWindow.content = formOrder.render();
});

eventEmitter.on("order:submit", () => {
  modalWindow.content = formContacts.render();
});

eventEmitter.on("contacts:submit", () => {
  const items = basketList.getList().map((elem) => elem.id);
  const order = Object.assign({}, customer, {
    total: basketList.getTotalAmount(),
    items: items,
  });
  try {
    store.postOrder(order).then((response: IOrderResponse) => {
      success.totalAmount = response.total;
    });
    customer.clearInfo();
    basketList.clearBasket();
    modalWindow.content = success.render();
  } catch {
    console.log("Не удалось отправить заказ на сервер");
  } 
});

eventEmitter.on("success:finish", () => {
  modalWindow.close();
});

//---- run ----//
const api = new Api(API_URL);
const store = new StoreService(api);
try {
  catalog.setList(await store.getData());
} catch (err) {
  console.log("Не удалось запросить данные с сервера.");
}
