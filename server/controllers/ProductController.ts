import { Controller, QueryParam, Post, Get, Body, Injectable, UseHook } from "../deno_modules.ts";
import { Response, ResponseData } from "../models/ApiResponse.ts";
import { PermissionHooks } from "../hooks/PermissionHooks.ts";
import ProductModel from "../db/ProductModel.ts";

//@UseHook(PermissionHooks, "product")
@Controller("/api/product")
@Injectable()
export class ProductController implements Response {
  constructor(private productModel: ProductModel) {}

  @Get("/list")
  @QueryParam("skip")
  @QueryParam("limit")
  private async getList(limit: string = "10", skip: string = "0") {
    const limitInt = parseInt(limit, 10);
    const skipInt = parseInt(skip, 10);

    const productList = await this.productModel.getProductList(limitInt, skipInt);
    const productCount = await this.productModel.getProductCount();

    return this.setResponse(true, "", productList, Math.ceil(productCount / limitInt));
  }

  setResponse(status = false, error = "", data: unknown[] = [], pageCount: number = 0): ResponseData {
    return { status, error, data, pageCount };
  }
}
