// import styled from "styled-components";

import styled from "styled-components";

// const PieChart = ({
//   plannedPercent,
//   activePercent,
//   completedPercent,
//   hibernatedPercent,
// }) => {
//   return (
//     <ChartContainer>
//       <Pie>
//         <Slice start="0%" end={`${plannedPercent}%`} color="#FFD700" />
//         <Slice
//           start={`${plannedPercent}%`}
//           end={`${plannedPercent + activePercent}%`}
//           color="#FF0000"
//         />
//         <Slice
//           start={`${plannedPercent + activePercent}%`}
//           end={`${plannedPercent + activePercent + completedPercent}%`}
//           color="#0000FF"
//         />
//         <Slice
//           start={`${plannedPercent + activePercent + completedPercent}%`}
//           end={`${
//             plannedPercent +
//             activePercent +
//             completedPercent +
//             hibernatedPercent
//           }%`}
//           color="#008000"
//         />
//       </Pie>
//       <Legend>
//         <LegendItem>
//           <ColorBox color="#FFD700" />
//           <Label>Planned ({plannedPercent}%)</Label>
//         </LegendItem>
//         <LegendItem>
//           <ColorBox color="#FF0000" />
//           <Label>Active ({activePercent}%)</Label>
//         </LegendItem>
//         <LegendItem>
//           <ColorBox color="#0000FF" />
//           <Label>Completed ({completedPercent}%)</Label>
//         </LegendItem>
//         <LegendItem>
//           <ColorBox color="#008000" />
//           <Label>Hibernated ({hibernatedPercent}%)</Label>
//         </LegendItem>
//       </Legend>
//     </ChartContainer>
//   );
// };

// const ChartContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-top: 2rem;
// `;

// const Pie = styled.div`
//   position: relative;
//   width: 200px;
//   height: 200px;
//   border-radius: 50%;
//   overflow: hidden;
// `;

// const Slice = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   clip-path: ${({ start, end }) =>
//     `polygon(50% 50%, 50% 0, ${start} 0, ${end} 100%)`};
// `;

// const Legend = styled.ul`
//   list-style: none;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   margin-left: 2rem;
// `;

// const LegendItem = styled.li`
//   display: flex;
//   align-items: center;
//   margin-bottom: 0.5rem;
// `;

// const ColorBox = styled.div`
//   width: 1.5rem;
//   height: 1.5rem;
//   background-color: ${({ color }) => color};
//   margin-right: 0.5rem;
// `;

// const Label = styled.span`
//   font-size: 1rem;
// `;

// export default PieChart;

export default function PieChart({
  projects,
  plannedProject,
  activeProject,
  completedProject,
  hibernatedProject,
}) {
  const plannedPercent = (plannedProject.length / projects.length) * 100;
  const activePercent = (activeProject.length / projects.length) * 100;
  const completedPercent = (completedProject.length / projects.length) * 100;
  const hibernatedPercent = (hibernatedProject.length / projects.length) * 100;

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
