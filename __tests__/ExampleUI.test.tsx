import { fireEvent, render, screen } from "./test-utils";
import "@testing-library/jest-dom";

describe("Button", () => {
  beforeEach(() => {
    render(
      <button onClick={() => console.log("hello world!")} role="button">
        Click me
      </button>
    );
  });

  it("prints 'hello world!' when clicked", () => {
    // creates a spy to test if a function is called
    // alternatively a mock can be created to swap an an expensive function (like an API call) with a fake implementation
    const consoleSpy = jest.spyOn(console, "log");

    // simulates a click event on the button
    fireEvent.click(screen.getByText("Click me"));

    // tests if the spy was called with the correct argument
    expect(consoleSpy).toHaveBeenCalledWith("hello world!");
    // removes the spy
    consoleSpy.mockRestore();
  });

  it("renders a button", () => {
    const button = screen.getByRole("button");

    // Tests the presence of a button element
    expect(button).toBeInTheDocument();
    // Tests the presence of the text "Click me" in the button element
    expect(button).toHaveTextContent("Click me");
  });

  it("looks like a button", () => {
    // Creates a snapshot of the button
    // so if the design is changed in the future, the snapshot will fail
    // and the developer will be alerted to update the test
    // or change their code if they didn't intend to change the design
    expect(screen).toMatchSnapshot();
  });
});
