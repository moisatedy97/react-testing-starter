import { productFactory } from "./db";

export const handlers = [...productFactory.product.toHandlers("rest"), ...productFactory.category.toHandlers("rest")];
