import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { server } from "../../moks/server";
import { HttpResponse, delay, http } from "msw";
import BrowseProductsPage from "../../../src/pages/BrowseProductsPage";
import { Theme } from "@radix-ui/themes";

describe("BrowseProductsPage", () => {
  const renderComponent = () => {
    render(
      <Theme>
        <BrowseProductsPage />
      </Theme>
    );
  };

  it("should show a loading skeleton when fetching categories", () => {
    server.use(
      http.get("/categories", async () => {
        await delay(1000);
        return HttpResponse.json([]);
      })
    );

    renderComponent();

    expect(screen.getByRole("progressbar", { name: /categories/i })).toBeInTheDocument();
  });

  it("should hide the loading skeleton after categories are fetched", async () => {
    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar", { name: /categories/i }));
  });

  it("should show a loading skeleton when fetching products", () => {
    server.use(
      http.get("/products", async () => {
        await delay(1000);
        return HttpResponse.json([]);
      })
    );

    renderComponent();

    expect(screen.getByRole("progressbar", { name: /products/i })).toBeInTheDocument();
  });

  it("should hide the loading skeleton after products are fetched", async () => {
    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar", { name: /products/i }));
  });

  it("should not render an error if categories are fetched", async () => {
    server.use(
      http.get("/categories", async () => {
        return HttpResponse.error();
      })
    );

    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar", { name: /categories/i }));

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox", { name: /categories/i })).not.toBeInTheDocument();
  });

  it("should render an error if products cannot be fetched", async () => {
    server.use(
      http.get("/products", async () => {
        return HttpResponse.error();
      })
    );

    renderComponent();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
