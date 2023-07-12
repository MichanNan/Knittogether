import { render, screen } from "@testing-library/react";
import PieChart from ".";

const projects = [
  { id: "1", name: "test project 1", status: "planned" },
  { id: "2", name: "test project 2", status: "active" },
  { id: "3", name: "test project 3", status: "completed" },
  { id: "4", name: "test project 4", status: "hibernated" },
];
const plannedProject = [{ id: "1", name: "test project 1", status: "planned" }]; // Add sample planned project data
const activeProject = [{ id: "2", name: "test project 2", status: "active" }]; // Add sample active project data
const completedProject = [
  { id: "3", name: "test project 3", status: "completed" },
];

test("renders PieChart component with legends", () => {
  render(
    <PieChart
      projects={projects}
      plannedProject={plannedProject}
      activeProject={activeProject}
      completedProject={completedProject}
    />
  );

  const plannedLegend = screen.getByText("Planned");
  const activeLegend = screen.getByText("Active");
  const completedLegend = screen.getByText("Completed");
  const hibernatedLegend = screen.getByText("Hibernated");

  expect(plannedLegend).toBeInTheDocument();
  expect(activeLegend).toBeInTheDocument();
  expect(completedLegend).toBeInTheDocument();
  expect(hibernatedLegend).toBeInTheDocument();
});

test("renders PieChart component with correct percentages", () => {
  render(
    <PieChart
      projects={projects}
      plannedProject={plannedProject}
      activeProject={activeProject}
      completedProject={completedProject}
    />
  );

  const myPieChart = screen.getByRole("pieChart");

  const plannedPercentEnd = (plannedProject.length / projects.length) * 100;
  const activePercentEnd =
    ((plannedProject.length + activeProject.length) / projects.length) * 100;
  const completedPercentEnd =
    ((plannedProject.length + activeProject.length + completedProject.length) /
      projects.length) *
    100;

  expect(myPieChart).toHaveStyle(`
    background: conic-gradient(
      #e38b29 0% ${plannedPercentEnd}%,
      #f1a661 ${plannedPercentEnd}% ${activePercentEnd}%,
      #ffd8a9 ${activePercentEnd}% ${completedPercentEnd}%,
      #fdeedc ${completedPercentEnd}%
    );
  `);
});
