import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { ImageWrapper } from "../../../styles";

export default function ProjectPreview({ project }) {
  return (
    <ProjectItem key={project._id}>
      <ProjectPreviewTitle>{project.name}</ProjectPreviewTitle>
      <Link href={`/${project._id}`}>
        <ImageWrapper>
          <Image
            src={project.image}
            alt="project-image"
            width={350}
            height="0"
            style={{ width: "100", height: "auto" }}
          />
        </ImageWrapper>
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
  font-size: 1rem;
`;
const ProjectPreviewTitle = styled.h3`
  font-size: 2rem;
  font-weight: 300;
`;

const ProjectPrevInfo = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 300;
`;
