import Heading from "../../Common/Heading";
import StyledButton from "../../Common/StyledButton";
import ProjectForm from "../ProjectForm";
import BackIcon from "../../Common/BackIcon/BackIcon";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  ColoredFont,
  HeavyFont,
  LightFont,
  Main,
  ImageWrapper,
  SubTitle,
} from "../../../styles";
import dayjs from "dayjs";

import ConfirmDelete from "../../Common/ConfirmDelete";

export default function ProjectDetail({ project, id }) {
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteProjectStatus, setConfirmDeleteProjectStatus] =
    useState(false);

  const { mutate } = useSWR("/api/project");

  function onEdit() {
    setIsEdit(true);
  }
  const router = useRouter();

  function cancelDelete() {
    setConfirmDeleteProjectStatus(false);
    router.push(`/${id}`);
  }

  function confirmDelete() {
    setConfirmDeleteProjectStatus(true);
  }

  async function handleDeleteProject(proId) {
    const response = fetch("/api/project", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proId),
    });
    mutate();
    router.push("/project");
  }

  return (
    <>
      {isEdit ? (
        <Main>
          <Heading>
            <BackIcon
              handleGoBack={() => {
                setIsEdit(false);
              }}
            />
            {project.name}
          </Heading>
          <ProjectForm
            isEdit
            setIsEdit={setIsEdit}
            project={project}
            buttonContentLeft="Cancel"
            buttonContentRight="Confirm"
          />
        </Main>
      ) : (
        <Main>
          <Heading>
            <BackIcon
              handleGoBack={() => {
                router.back();
              }}
            />
            {project.name}
          </Heading>
          <DetailContainer>
            <ImageWrapper>
              <Image
                src={project.image}
                alt={project.name}
                width={300}
                height="0"
                style={{ width: "100%", height: "auto" }}
              />
            </ImageWrapper>
            {
              <ProjectInfoWrapper>
                This project is &nbsp;
                <ColoredFont>{project.status}</ColoredFont> &nbsp;and you feel
                &nbsp;<ColoredFont>{project.happiness}</ColoredFont>
              </ProjectInfoWrapper>
            }

            <ProjectSectionContainer>
              <SubTitle>
                <ColoredFont>Details</ColoredFont>
              </SubTitle>
              <DetailRowSection>
                <HeavyFont>
                  <p>The project is for:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.details[0].recipient}</span>
                </LightFont>

                <HeavyFont>
                  <p>Size:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.details[0].size}</span>
                </LightFont>
              </DetailRowSection>
              <DetailRowSection>
                <HeavyFont>
                  <p>Gauge:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.details[0].gauge}</span>
                </LightFont>

                <HeavyFont>
                  <p>Needle Size:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.details[0].needleSize}</span>
                </LightFont>
              </DetailRowSection>
              <DetailRowSection>
                <HeavyFont>
                  <p>Start:</p>
                </HeavyFont>
                <LightFont>
                  <span>
                    {dayjs(project.details[0].start).format("DD-MM-YYYY")}
                  </span>
                </LightFont>

                <HeavyFont>
                  <p>End:</p>
                </HeavyFont>
                <LightFont>
                  <span>
                    {dayjs(project.details[0].end).format("DD-MM-YYYY")}
                  </span>
                </LightFont>
              </DetailRowSection>
            </ProjectSectionContainer>

            {project.yarn.map((yarnData) => (
              <ProjectSectionContainer key={yarnData.index}>
                <SubTitle>
                  <ColoredFont>Yarn</ColoredFont>
                </SubTitle>

                <DetailRowSection>
                  <HeavyFont>
                    <p>Brand:</p>
                  </HeavyFont>
                  <LightFont>
                    <span>{yarnData?.brand}</span>
                  </LightFont>

                  <HeavyFont>
                    <p>Skein:</p>
                  </HeavyFont>
                  <LightFont>
                    <span>{yarnData?.skein}</span>
                  </LightFont>
                </DetailRowSection>
                <DetailRowSection>
                  <HeavyFont>
                    <p>Type:</p>
                  </HeavyFont>
                  <LightFont>
                    <span>{yarnData?.type}</span>
                  </LightFont>

                  <HeavyFont>
                    <p>Gramm:</p>
                  </HeavyFont>
                  <LightFont>
                    <span>{yarnData?.gramm}</span>
                  </LightFont>
                </DetailRowSection>
                <DetailRowSection>
                  <HeavyFont>
                    <p>Color:</p>
                  </HeavyFont>
                  <LightFont>
                    <span>{yarnData?.color}</span>
                  </LightFont>

                  <HeavyFont>
                    <p>Meter:</p>
                  </HeavyFont>
                  <LightFont>
                    <span>{yarnData?.meter}</span>
                  </LightFont>
                </DetailRowSection>
              </ProjectSectionContainer>
            ))}

            <ProjectSectionContainer>
              <SubTitle>
                <ColoredFont>Note:</ColoredFont>
              </SubTitle>

              <LightFont>{project.note}</LightFont>
            </ProjectSectionContainer>

            <ButtonRowSection>
              <StyledButton width="8rem" height="3rem" onClick={confirmDelete}>
                Delete
              </StyledButton>
              <StyledButton width="8rem" height="3rem" onClick={onEdit}>
                Edit
              </StyledButton>
            </ButtonRowSection>
          </DetailContainer>
          {confirmDeleteProjectStatus && (
            <ConfirmDelete
              projectId={id}
              cancelDelete={cancelDelete}
              onDelete={handleDeleteProject}
            />
          )}
        </Main>
      )}
    </>
  );
}
const DetailContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
  margin-top: 3rem;
`;
const ProjectInfoWrapper = styled.section`
  display: flex;
  margin: 1rem auto;
  justify-content: center;
`;

const ProjectSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: start;
  width: 100%;
`;
const DetailRowSection = styled.div`
  display: flex;
  gap: 1.2rem;
`;
const ButtonRowSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
`;
