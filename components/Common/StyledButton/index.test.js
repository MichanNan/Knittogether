import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StyledButton from ".";

const mockOnClick = jest.fn();
const buttonText = "Click Me";

test("renders StyledButton component with correct styles and text", () => {
  render(
    <StyledButton
      width="10rem"
      height="3rem"
      onClick={mockOnClick}
      className="custom-class"
      fontSize="1rem"
      disabled={false}
    >
      {buttonText}
    </StyledButton>
  );

  const button = screen.getByRole("button", { name: buttonText });

  expect(button).toHaveTextContent(buttonText);
});

test("calls onClick function when button is clicked", async () => {
  render(
    <StyledButton
      width="10rem"
      height="3rem"
      onClick={mockOnClick}
      className="custom-class"
      fontSize="1rem"
      disabled={false}
    >
      {buttonText}
    </StyledButton>
  );

  const button = screen.getByRole("button", { name: buttonText });

  await userEvent.click(button);

  expect(mockOnClick).toHaveBeenCalledTimes(1);
});

test("renders StyledButton component as disabled", () => {
  render(
    <StyledButton
      width="10rem"
      height="3rem"
      onClick={mockOnClick}
      className="custom-class"
      fontSize="1rem"
      disabled={true}
    >
      {buttonText}
    </StyledButton>
  );

  const button = screen.getByRole("button", { name: buttonText });

  expect(button).toBeDisabled();
});
