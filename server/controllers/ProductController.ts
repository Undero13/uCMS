import { Controller, Param, Get, Put, Post, Body, Injectable, UseHook } from "../deno_modules.ts";
import { Response, ResponseData } from "../models/ApiResponse.ts";
import { PermissionHooks } from "../hooks/PermissionHooks.ts";
import ProductModel from "../db/ProductModel.ts";
import { RawProductData, ProductDbRecord } from "../models/ApiProduct.ts";

@Injectable()
@Controller("/api/product")
export class ProductController implements Response {
  constructor(private productModel: ProductModel) {}

  @Get("/list/:limit/:skip")
  private async getList(@Param("limit") limit: string = "10", @Param("skip") skip: string = "0") {
    const limitInt = parseInt(limit, 10);
    const skipInt = parseInt(skip, 10);

    const productList = await this.productModel.getProductList(limitInt, skipInt);
    const productCount = await this.productModel.getProductCount();

    return this.setResponse(true, "", productList, Math.ceil(productCount / limitInt));
  }

  @Body()
  @Post("/create")
  @UseHook(PermissionHooks, "product.create")
  private async create(body: any) {
    let product: RawProductData;

    try {
      product = JSON.parse(body.data);
    } catch (e) {
      product = body.data;
    }

    const id = await this.productModel.createProduct(product);
    return this.setResponse(true, "", [{ id }]);
  }

  @Body()
  @Put("/update")
  @UseHook(PermissionHooks, "product.update")
  private async update(body: any) {
    let product: ProductDbRecord;

    try {
      product = JSON.parse(body.data);
    } catch (e) {
      product = body.data;
    }

    await this.productModel.updateProduct(product);
    return this.setResponse(true);
  }

  setResponse(status = false, error = "", data: unknown[] = [], pageCount: number = 0): ResponseData {
    return { status, error, data, pageCount };
  }
}
