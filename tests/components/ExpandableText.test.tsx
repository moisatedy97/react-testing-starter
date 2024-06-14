import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const shortText = "This is a test text";

  it("should render the whole text under limit 255", () => {
    render(<ExpandableText text={shortText} />);

    expect(shortText.length).toBeLessThanOrEqual(limit);
    expect(screen.getByText(shortText)).toBeInTheDocument();
  });

  it("should truncate text if longer than limit", () => {
    render(<ExpandableText text={longText} />);

    expect(longText.length).toBeGreaterThan(limit);

    const truncatedText = longText.substring(0, limit) + "...";
    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
  });

  it("should expand text when show more button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);

    const user = userEvent.setup();
    await user.click(button);
    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("should collapse text when show less button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const truncatedText = longText.substring(0, limit) + "...";
    const button = screen.getByRole("button");

    const user = userEvent.setup();
    await user.click(button);
    await user.click(button);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });
});
