import { products } from "./connection.ts";
import { ProductDbRecord, RawProductData } from "../models/ApiProduct.ts";
import { uuid } from "../deno_modules.ts";

export default class ProductModel {
  public async getProductList(limit: number, skip: number) {
    const productList: ProductDbRecord[] = await products.find({ id: { $ne: null } }, { limit, skip });
    return productList;
  }

  public async getProductCount() {
    const count = await products.count({ id: { $ne: null } });
    return count;
  }

  public async createProduct(product: RawProductData) {
    const id = uuid();
    const insertData = { id, ...product };
    await products.insertOne(insertData);
    return id;
  }

  public async updateProduct(product: ProductDbRecord) {
    const { matchedCount, modifiedCount } = await products.updateOne(
      { id: { $eq: product.id } },
      {
        $set: {
          name: product.name,
          price: product.price,
          description: product.description,
          attributes: product.attributes,
          seo: product.seo,
          images: product.images
        }
      }
    );
    if (matchedCount === modifiedCount) {
      return true;
    }

    return false;
  }
}
