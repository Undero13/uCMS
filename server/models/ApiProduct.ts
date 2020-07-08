export interface ProductDbRecord extends RawProductData {
  id: string;
}

export type ProductRespondData = {
  data: RawProductData;
};

export type RawProductData = {
  name: string;
  price: number;
  description: string;
  attributes: ProductAttributes;
  seo: ProductSeo;
  images: string[];
};

export type ProductSeo = {
  title: string;
  description: string;
};

export type ProductAttributes = {
  material: string;
  color: string;
  weight: number;
};
