import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    const onChange = vi.fn();
    render(
      <>
        <Theme>
          <OrderStatusSelector onChange={onChange} />
        </Theme>
      </>
    );

    const user = userEvent.setup();
    const button = screen.getByRole("combobox");

    return { button, onChange, user };
  };

  it("should render New as default value", () => {
    const { button } = renderComponent();

    expect(button).toHaveTextContent(/new/i);
  });

  it("should render correct statuses", async () => {
    const { button, user } = renderComponent();

    await user.click(button);

    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(3);
    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });

  it("should render Processed option when user selects Processed", async () => {
    const { button, user, onChange } = renderComponent();
    await user.click(button);

    const processedOption = await screen.findByRole("option", {
      name: /processed/i,
    });
    await user.click(processedOption);

    expect(onChange).toHaveBeenCalledWith("processed");
    expect(button).toHaveTextContent(/processed/i);
  });
});
