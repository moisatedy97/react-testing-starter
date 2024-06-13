import { render, screen } from "@testing-library/react";
import { User } from "../../src/entities";
import UserList from "../../src/components/UserList";

describe("User List", () => {
  it("should render no users if users is empty", () => {
    const users: User[] = [];

    render(<UserList users={users} />);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("should render a list of users", () => {
    const users: User[] = [
      { id: 1, name: "John", isAdmin: false },
      { id: 2, name: "Jane", isAdmin: false },
    ];

    render(<UserList users={users} />);

    users.forEach((user) => {
      expect(screen.getByRole("link", { name: user.name })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: user.name })).toHaveAttribute(
        "href",
        `/users/${user.id}`
      );
    });
  });
});
