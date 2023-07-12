import ConfirmDelete from ".";
import { render, screen } from "@testing-library/react";

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
