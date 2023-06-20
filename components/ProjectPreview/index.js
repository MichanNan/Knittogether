import Image from "next/image";
import styled from "styled-components";

export default function ProjectPreview({ project }) {
  return (
    <ProjectItem key={project.id}>
      <h3>{project.name}</h3>
      <Image src={project.image} alt="project-image" width={375} height={375} />
      <ProjectPrevInfo>
        <span>{`Started at:${project.details.startDate}`}</span>
        <span> {`For ${project.details.recipient}`}</span>
      </ProjectPrevInfo>
    </ProjectItem>
  );
}
const ProjectItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const ProjectPrevInfo = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;
