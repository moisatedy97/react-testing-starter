import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import ProductList from "../../src/components/ProductList";
import { productFactory } from "../moks/db";
import { server } from "../moks/server";

describe("ProductList", () => {
  const productIds: number[] = [];

  beforeAll(() => {
    [1, 2, 3].forEach(() => {
      productIds.push(productFactory.product.create().id);
    });
  });

  afterAll(() => {
    productFactory.product.deleteMany({ where: { id: { in: productIds } } });
  });

  const renderComponent = async () => {
    render(<ProductList />);

    const listItems = await screen.findAllByRole("listitem");

    return { listItems };
  };

  it("should render the list of products", async () => {
    const { listItems } = await renderComponent();

    expect(listItems).toHaveLength(3);
    screen.debug();
  });

  it("should render no products if no products are found", async () => {
    server.use(http.get("/products", () => HttpResponse.json([])));

    renderComponent();

    const message = await screen.findByText(/no products /i);
    expect(message).toBeInTheDocument();
  });

  it("should render error if no products are found", async () => {
    server.use(http.get("/products", () => HttpResponse.error()));

    render(<ProductList />);

    const message = await screen.findByText(/error/i);
    expect(message).toBeInTheDocument();
  });
});
