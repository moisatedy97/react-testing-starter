import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";

describe("User Account", () => {
  it("should render user name", () => {
    const user = { id: 1, name: "John" };

    render(<UserAccount user={user} />);

    const text = screen.getByText(user.name);

    expect(text).toBeInTheDocument();
  });

  it("should render button if user is admin", () => {
    const user = { id: 1, name: "John", isAdmin: true };

    render(<UserAccount user={user} />);

    const button = screen.queryByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render button if user is not admin", () => {
    const user = { id: 1, name: "John", isAdmin: false };

    render(<UserAccount user={user} />);

    const button = screen.queryByRole("button");

    expect(button).not.toBeInTheDocument();
  });
});
