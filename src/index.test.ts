import { describe, expect, it } from "bun:test";
import { greet } from "./index";

describe("greet", () => {
  it("returns a greeting with the given name", () => {
    expect(greet("Paladin")).toBe("Hello, Paladin!");
  });

  it("handles an empty string", () => {
    expect(greet("")).toBe("Hello, !");
  });
});
