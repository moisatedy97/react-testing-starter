import { render, screen } from "@testing-library/react";
import ProductList from "../../src/components/ProductList";
import { server } from "../moks/server";
import { http, HttpResponse } from "msw";

describe("ProductList", () => {
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
});
