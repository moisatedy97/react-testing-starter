import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

it("should render Hello with the name when name is provided", () => {
  render(<Greet name="John" />);

  const heading = screen.getByRole("heading");

  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent(/hello/i);
});

it("should render button when name is not provided", () => {
  render(<Greet name="" />);

  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
});
