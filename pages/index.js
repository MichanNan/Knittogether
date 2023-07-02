import Navigation from "../components/Common/Navigation";
import Heading from "../components/Common/Heading";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

import { ColoredFont, Main, StyledLink } from "../styles";
import ProjectPreview from "../components/Project/ProjectPreview";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home({ projects }) {
  //   const { data: allProjects } = useSWR("/api/project");

  const plannedProject = projects?.filter(
    (project) => project.status === "planned"
  );
  const activeProject = projects?.filter(
    (project) => project.status === "active"
  );
  const completedProject = projects?.filter(
    (project) => project.status === "completed"
  );
  const hibernatedProject = projects?.filter(
    (project) => project.status === "hibernated"
  );

  const domRef = useRef();
  const charInit = () => {
    const myChart = echarts.init(domRef.current);
    myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "15%",
        left: "center",
        orient: "horizontal",
        align: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "65%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: plannedProject?.length, name: "Planned" },
            { value: activeProject?.length, name: "Active" },
            { value: completedProject?.length, name: "Completed" },
            { value: hibernatedProject?.length, name: "Hibernated" },
          ],
        },
      ],
    });
  };

  useEffect(() => {
    charInit();
  }, [projects]);

  return (
    <Main>
      <Heading>Knit Together</Heading>
      <SubTitle top="4rem">Welcome</SubTitle>
      <InfoWrapper>
        your &nbsp;<ColoredFont>overview </ColoredFont>&nbsp;so far
      </InfoWrapper>
      <ChartContainer ref={domRef}></ChartContainer>
      <SubTitle top="2rem">Active Projects</SubTitle>
      <ActiveProjectContainer>
        {activeProject.map((project) => (
          <ProjectItemWrapper key={project._id}>
            <p>{project.name}</p>
            <ImageWrapper>
              <StyledLink href={`/${project._id}`}>
                <Image
                  src={project.image}
                  alt={project.name}
                  width={150}
                  height={120}
                />
              </StyledLink>
            </ImageWrapper>
          </ProjectItemWrapper>
        ))}
      </ActiveProjectContainer>

      <Navigation />
    </Main>
  );
}

const ChartContainer = styled.div`
  width: 100vw;
  height: 65vw;
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  align-self: flex-start;
  transform: translateX(2rem);
  margin-top: ${({ top }) => top};
`;

const InfoWrapper = styled.div`
  display: flex;
`;

const ActiveProjectContainer = styled.section`
  width: 90%;
  display: flex;
  overflow-x: auto;
  overflow-y: visible;
  white-space: nowrap;
  gap: 1rem;
  position: relative;
  top: 2rem;
  margin: 0 2rem;
  transform: translateY(-1rem);
`;
const ProjectItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  object-fit: cover;
  border-radius: 0.8rem;
  overflow: hidden;
`;
