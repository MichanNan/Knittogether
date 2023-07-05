import styled from "styled-components";

export default function PieChart({
  projects,
  plannedProject,
  activeProject,
  completedProject,
}) {
  const plannedPercent = (plannedProject.length / projects.length) * 100;
  const activePercent = (activeProject.length / projects.length) * 100;
  const completedPercent = (completedProject.length / projects.length) * 100;

  const plannedPercentEnd = `${plannedPercent}%`;
  const activePercentEnd = `${plannedPercent + activePercent}%`;
  const completedPercentEnd = `${
    plannedPercent + activePercent + completedPercent
  }%`;

  return (
    <ChartContainer>
      <LegendContainer>
        <LegendItem color="#e38b29" />
        <LegendText>Planned</LegendText>
        <LegendItem color="#f1a661" />
        <LegendText>Active</LegendText>
        <LegendItem color="#ffd8a9" />
        <LegendText>Completed</LegendText>
        <LegendItem color="#fdeedc" />
        <LegendText>Hibernated</LegendText>
      </LegendContainer>
      <MyPieChart
        plannedPercentEnd={plannedPercentEnd}
        activePercentEnd={activePercentEnd}
        completedPercentEnd={completedPercentEnd}
      ></MyPieChart>
    </ChartContainer>
  );
}
const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyPieChart = styled.div`
  margin-top: 1rem;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background: conic-gradient(
    #e38b29 0% ${({ plannedPercentEnd }) => plannedPercentEnd},
    #f1a661 ${({ plannedPercentEnd }) => plannedPercentEnd}
      ${({ activePercentEnd }) => activePercentEnd},
    #ffd8a9 ${({ activePercentEnd }) => activePercentEnd}
      ${({ completedPercentEnd }) => completedPercentEnd},
    #fdeedc ${({ completedPercentEnd }) => completedPercentEnd}
  );
`;
const LegendContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 0.5rem;
  width: 90%;
`;
const LegendItem = styled.div`
  width: 2rem;
  height: 1rem;
  background-color: ${({ color }) => color};
`;
const LegendText = styled.p`
  font-size: 0.7rem;
`;
