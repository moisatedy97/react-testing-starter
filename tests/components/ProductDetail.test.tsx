import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { server } from "../moks/server";
import { HttpResponse, http } from "msw";
import { productFactory } from "../moks/db";
import AllProviders from "../all-providers";

describe("ProductDetail", () => {
  let productId: number;

  beforeAll(() => {
    productId = productFactory.product.create().id;
  });

  afterAll(() => {
    productFactory.product.delete({ where: { id: { equals: productId } } });
  });

  const renderComponent = async (productId: number) => {
    render(<ProductDetail productId={productId} />, { wrapper: AllProviders });
  };

  it("should render product with id", async () => {
    const product = productFactory.product.findFirst({ where: { id: { equals: productId } } });

    renderComponent(productId);

    const productElement = await screen.findByText(new RegExp(product!.name));

    expect(productElement).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product!.price.toString()))).toBeInTheDocument();
  });

  it("should render message if product not found", async () => {
    server.use(http.get(`/products/${productId}`, () => HttpResponse.json(null)));

    renderComponent(productId);

    const message = await screen.findByText(/not found/i);

    expect(message).toBeInTheDocument();
  });

  it("should render error for invalid productId", async () => {
    const productId = 0;
    server.use(http.get(`/products/${productId}`, () => HttpResponse.error()));

    renderComponent(productId);

    const message = await screen.findByText(/error/i);

    expect(message).toBeInTheDocument();
  });
});
