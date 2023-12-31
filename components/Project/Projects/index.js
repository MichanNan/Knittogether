import ProjectPreview from "../ProjectPreview";
import styled from "styled-components";

export default function Projects({ projectsList }) {
  return (
    <ProjectContainer>
      {projectsList.map((project) => {
        return <ProjectPreview key={project._id} project={project} />;
      })}
    </ProjectContainer>
  );
}

const ProjectContainer = styled.div`
  position: absolute;
  top: 14rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 5rem;
`;
