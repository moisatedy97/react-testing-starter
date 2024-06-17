import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderSearchBox = () => {
    const searchTerm = "test";
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);

    const input = screen.getByPlaceholderText(/search/i);

    return {
      searchTerm,
      input,
      onChange,
    };
  };

  it("should render an input with placeholder", () => {
    const { input } = renderSearchBox();

    expect(input).toBeInTheDocument();
  });

  it("should call onChange when Enter key is pressed", async () => {
    const { searchTerm, input, onChange } = renderSearchBox();

    const user = userEvent.setup();
    await user.type(input, `${searchTerm}{enter}`);

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });

  it("should not call onChange when Enter key is not pressed", async () => {
    const { input, onChange } = renderSearchBox();

    const user = userEvent.setup();
    await user.type(input, `{enter}`);

    expect(onChange).not.toHaveBeenCalled();
  });
});
