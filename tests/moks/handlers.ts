import { http, HttpResponse } from "msw";
import { productFactory } from "./db";

export const handlers = [
  http.get("/categories", () => {
    return HttpResponse.json([
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
      { id: 3, name: "Category 3" }
    ]);
  }),

  ...productFactory.product.toHandlers("rest")
];
