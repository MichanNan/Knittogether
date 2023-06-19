import { mockProjects } from "../../db/projects";
import ProjectPreview from "../ProjectPreview";
import styled from "styled-components";

export default function Projects() {
  return (
    <ProjectContainer>
      {mockProjects.map((project) => {
        return <ProjectPreview key={project.id} project={project} />;
      })}
    </ProjectContainer>
  );
}

const ProjectContainer = styled.div`
  position: relative;
  top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 10rem;
`;
