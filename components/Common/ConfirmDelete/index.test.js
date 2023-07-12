import ConfirmDelete from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const onDeleteMock = jest.fn();

test("render a delete button", () => {
  render(<ConfirmDelete />);
  const deleteButton = screen.getByText("Delete");
  expect(deleteButton).toBeInTheDocument();
});
test("render a cancel button", () => {
  render(<ConfirmDelete />);
  const cancelButton = screen.getByText("Cancel");
  expect(cancelButton).toBeInTheDocument();
});
test("calls onDelete when Delete button is clocked", async () => {
  render(<ConfirmDelete onDelete={onDeleteMock} />);
  const deleteButton = screen.getByText("Delete");
  await userEvent.click(deleteButton);
  expect(onDeleteMock).toHaveBeenCalledTimes(1);
});
