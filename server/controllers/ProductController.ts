import { Controller, QueryParam, Post, Get, Body, Injectable, UseHook } from "../deno_modules.ts";
import { Response, ResponseData } from "../models/ApiResponse.ts";
import { PermissionHooks } from "../hooks/PermissionHooks.ts";

//@UseHook(PermissionHooks, "product")
@Controller("/api/product")
@Injectable()
export class ProductController implements Response {
  @Get("/list")
  private async getList() {
    return "text";
  }

  setResponse(status = false, error = "", data: unknown[] = [], pageCount: number = 0): ResponseData {
    return { status, error, data, pageCount };
  }
}
