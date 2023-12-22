import { ProductsStore } from './stores/ProductsStore';

export class RootStore {
  productsStore = new ProductsStore();
}
