import { it, expect, describe } from "vitest";

describe("main", () => {
  it("should", async () => {
    const response = await fetch("/categories");

    const data = await response.json();

    expect(data).toHaveLength(3);
  });
});
