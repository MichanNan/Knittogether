import Navigation from "../components/Common/Navigation";
import Header from "../components/Common/Heading";
import PieChart from "../components/Common/PieChart";

import { ColoredFont, HeavyFont, Main, StyledLink } from "../styles";
import styled from "styled-components";

import Image from "next/image";

import { useSession } from "next-auth/react";

export default function HomePage({ projects, mutate }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return "";
  }

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

  return session ? (
    <Main>
      <Header mutate={mutate}>Knit Together</Header>
      <SubTitle top="4rem">
        Welcome &nbsp;<HeavyFont>{`${session?.user.name}`}</HeavyFont>
      </SubTitle>
      <InfoWrapper>
        Keep up! your projects &nbsp;<ColoredFont>overview </ColoredFont>
        &nbsp;so far
      </InfoWrapper>
      <PieChart
        plannedProject={plannedProject}
        activeProject={activeProject}
        completedProject={completedProject}
        hibernatedProject={hibernatedProject}
        projects={projects}
      />
      <SubTitle top="2rem">Active Projects</SubTitle>
      <ActiveProjectContainer>
        {activeProject.map((project) => (
          <ProjectItemWrapper key={project._id}>
            <p>{project.name}</p>
            <ImageContainer>
              <StyledLink href={`/${project._id}`}>
                <Image
                  src={project.image}
                  alt={project.name}
                  width={150}
                  height={120}
                />
              </StyledLink>
            </ImageContainer>
          </ProjectItemWrapper>
        ))}
      </ActiveProjectContainer>
      <Navigation />
    </Main>
  ) : (
    <Main>
      <Header checkOut mutate={mutate}>
        Knit Together
      </Header>
      <SubTitle top="8rem">
        Please
        <StyledLink href="/">
          &nbsp;<ColoredFont>Sign in </ColoredFont>
        </StyledLink>
        &nbsp;first 🧶
      </SubTitle>
      <SubTitle top="1rem">
        Having no account?
        <StyledLink href="/register">
          &nbsp;
          <ColoredFont>Sign up</ColoredFont>
        </StyledLink>
        &nbsp; here 🧶
      </SubTitle>
    </Main>
  );
}

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

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  object-fit: cover;
  border-radius: 0.8rem;
  overflow: hidden;
`;
