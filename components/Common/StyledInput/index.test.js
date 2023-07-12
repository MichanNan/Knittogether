import { render, screen } from "@testing-library/react";
import StyledInput from ".";
import userEvent from "@testing-library/user-event";

const mockOnChange = jest.fn();
const defaultValue = "Initial value";
const placeholder = "Enter text";
test("renders StyledInput component with correct styles and attributes", () => {
  render(
    <StyledInput
      defaultValue={defaultValue}
      width="10rem"
      height="3rem"
      radius="0.6rem"
      name="input-name"
      type="text"
      maxLength={50}
      required
      onChange={mockOnChange}
      backgroundColor="#ffffff"
      placeholderColor="#cccccc"
      placeholder={placeholder}
    />
  );

  const input = screen.getByRole("textbox");

  expect(input).toHaveStyle(`
    width: 10rem;
    height: 3rem;
    border-radius: 0.6rem;
    border: none;
    background-color: #ffffff;
    font-size: 1rem;
  `);

  expect(input).toHaveAttribute("name", "input-name");
  expect(input).toHaveAttribute("type", "text");
  expect(input).toHaveAttribute("maxlength", "50");
  expect(input).toBeRequired();
  expect(input).toHaveValue(defaultValue);
  expect(input).toHaveAttribute("placeholder", placeholder);
});

test("calls onChange function when input value changes", async () => {
  render(
    <StyledInput
      defaultValue={defaultValue}
      width="10rem"
      height="3rem"
      radius="0.6rem"
      name="input-name"
      type="text"
      maxLength={50}
      required
      onChange={mockOnChange}
      backgroundColor="#ffffff"
      placeholderColor="#cccccc"
      placeholder="Enter text"
    />
  );

  const input = screen.getByRole("textbox");
  const newValue = "new value";
  userEvent.clear(input);
  await userEvent.type(input, newValue);

  expect(mockOnChange).toHaveBeenCalledTimes(10);
  expect(input).toHaveValue(newValue);
});
