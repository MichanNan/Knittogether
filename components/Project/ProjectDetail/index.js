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
                <HeavyFont>The project is for:</HeavyFont>
                <LightFont>{project.details[0].recipient}</LightFont>

                <HeavyFont>Size:</HeavyFont>
                <LightFont>{project.details[0].size}</LightFont>
              </DetailRowSection>
              <DetailRowSection>
                <HeavyFont>Gauge:</HeavyFont>
                <LightFont>{project.details[0].gauge}</LightFont>

                <HeavyFont>Needle Size:</HeavyFont>
                <LightFont>{project.details[0].needleSize}</LightFont>
              </DetailRowSection>
              <DetailRowSection>
                <HeavyFont>Start:</HeavyFont>
                <LightFont>
                  {dayjs(project.details[0].start).format("DD-MM-YYYY")}
                </LightFont>

                <HeavyFont>End:</HeavyFont>
                <LightFont>
                  {dayjs(project.details[0].end).format("DD-MM-YYYY")}
                </LightFont>
              </DetailRowSection>
            </ProjectSectionContainer>

            {project.yarn.map((yarnData) => (
              <ProjectSectionContainer key={yarnData._id}>
                <SubTitle>
                  <ColoredFont>Yarn</ColoredFont>
                </SubTitle>

                <DetailRowSection>
                  <HeavyFont>Brand:</HeavyFont>
                  <LightFont>{yarnData?.brand}</LightFont>

                  <HeavyFont>Skein:</HeavyFont>
                  <LightFont>{yarnData?.skein}</LightFont>
                </DetailRowSection>
                <DetailRowSection>
                  <HeavyFont>Type:</HeavyFont>
                  <LightFont>{yarnData?.type}</LightFont>

                  <HeavyFont>Gramm:</HeavyFont>
                  <LightFont>{yarnData?.gramm}</LightFont>
                </DetailRowSection>
                <DetailRowSection>
                  <HeavyFont>Color:</HeavyFont>
                  <LightFont>{yarnData?.color}</LightFont>

                  <HeavyFont>Meter:</HeavyFont>
                  <LightFont>{yarnData?.meter}</LightFont>
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
