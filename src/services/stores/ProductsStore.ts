import { makeAutoObservable } from 'mobx';
import { IProduct } from '../utils/types';

export class ProductsStore {
  constructor() {
    makeAutoObservable(this);
    this.getProducts();
  }

  data: Map<string, IProduct> = new Map();

  addProduct = (data: IProduct) => {
    this.data.set(data.id, data);
    localStorage.setItem('items', JSON.stringify([...Array.from(this.data.values())]));
  };

  getProducts = () => {
    const itemsString = localStorage.getItem('items');
    if (itemsString) {
      const itemsArray = JSON.parse(itemsString);
      itemsArray.forEach((item: IProduct) => {
        this.data.set(item.id, item);
      });
    }
  };

  deleteProduct = (id: string) => {
    this.data.delete(id);
    localStorage.setItem('items', JSON.stringify([...Array.from(this.data.values())]));
  };

  deleteProducts = () => {
    this.data.clear();
    localStorage.setItem('items', JSON.stringify([...Array.from(this.data.values())]));
  };

  updateProduct = (data: IProduct) => {
    this.data.set(data.id, data);
    localStorage.setItem('items', JSON.stringify([...Array.from(this.data.values())]));
  };

  get totalPrice() {
    return Array.from(this.data.values()).reduce((total, item) => {
      return total + Number(item.price);
    }, 0);
  }
}
