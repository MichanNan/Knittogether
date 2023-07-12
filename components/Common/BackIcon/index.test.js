import BackIcon from "./BackIcon";
import { render, screen } from "@testing-library/react";

test("test", () => {
  render(<BackIcon />);
  const element = screen.getByTitle("back");
  expect(element).toBeInTheDocument();
});
