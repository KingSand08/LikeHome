import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";
import exp from "constants";

describe("h1", () => {
  it("renders a heading with text context 'hi'", () => {
    render(<h1>Hi</h1>);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Hi");
  });
});
