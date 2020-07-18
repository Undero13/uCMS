export interface ProductTable {
  caption?: string;
  headers?: string[];
  rows?: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: string;
}

export interface State {
  products: Product[];
  pageCount: number;
}
