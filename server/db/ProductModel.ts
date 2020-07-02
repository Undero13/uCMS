import { products } from "./connection.ts";
import { ProductDbRecord } from "../models/ApiProduct.ts";

export default class ProductModel {
  public async getProductList(limit: number, skip: number) {
    const productList: ProductDbRecord[] = await products.find({ id: { $ne: null } }, { limit, skip });
    return productList;
  }

  public async getProductCount() {
    const count = await products.count({ login: { $ne: null } });
    return count;
  }
}
