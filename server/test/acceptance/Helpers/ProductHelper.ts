import { products } from "../../../db/connection.ts";

export default class ProductHelper {
  public static async getProductByID(id: string): Promise<any> {
    return await products.findOne({ id: { $eq: id } });
  }
}
