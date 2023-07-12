import Navigation from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("renders navItem with corresponding color ", async () => {
  render(<Navigation />);
  const homeNavItem = screen.getByText("Home");
  const projectsNavItem = screen.getByText("Projects");
  expect(homeNavItem).toBeInTheDocument();
  expect(projectsNavItem).toBeInTheDocument();

  await userEvent.click(projectsNavItem);
  expect(homeNavItem).toHaveStyle({ color: "" });
  expect(projectsNavItem).toHaveStyle({ color: "var(--color-orange)" });
});
