export interface ProductTable {
  caption?: string;
  headers?: string[];
  rows?: Product[];
}

export interface Product {
  id: string;
  name,
  price
}

export interface State {
  products: Product[];
  pageCount: number;
}
