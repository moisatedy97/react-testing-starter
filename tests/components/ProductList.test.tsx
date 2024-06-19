import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import delay from "delay";
import { HttpResponse, http } from "msw";
import ProductList from "../../src/components/ProductList";
import { productFactory } from "../moks/db";
import { server } from "../moks/server";
import AllProviders from "../all-providers";

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
    render(<ProductList />, { wrapper: AllProviders });

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

    renderComponent();

    const message = await screen.findByText(/error/i);
    expect(message).toBeInTheDocument();
  });

  it("should render a loading indicator when fetching data", async () => {
    server.use(
      http.get("/products", async () => {
        await delay(1000);
        return HttpResponse.json([]);
      })
    );

    renderComponent();

    const loadingIndicator = await screen.findByText(/loading/i);
    expect(loadingIndicator).toBeInTheDocument();
  });

  it("should remove the loading indicator after data is fetched", async () => {
    renderComponent();

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  it("should remove the loading indicator if data fatching fails", async () => {
    server.use(http.get("/products", () => HttpResponse.error()));

    renderComponent();

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });
});
