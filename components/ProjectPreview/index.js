import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function ProjectPreview({ project }) {
  return (
    <ProjectItem key={project._id}>
      <h3>{project.name}</h3>
      <Link href={`/${project._id}`}>
        <Image
          src={project.image}
          alt="project-image"
          width={375}
          height={375}
        />
      </Link>
      <ProjectPrevInfo>
        {project.status === "planned" ? (
          <span>not started yet</span>
        ) : (
          <span>{`Started at:${project.details[0].start}`}</span>
        )}
        <span> {`For ${project.details[0].recipient}`}</span>
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
