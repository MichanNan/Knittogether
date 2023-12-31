import Heading from "../../Common/Heading";
import StyledButton from "../../Common/StyledButton";
import ProjectForm from "../ProjectForm";
import BackIcon from "../../Common/BackIcon/BackIcon";
import ConfirmDelete from "../../Common/ConfirmDelete";
import Navigation from "../../Common/Navigation";

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
  AddItemButton,
  BackDrop,
} from "../../../styles";
import dayjs from "dayjs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

export default function ProjectDetail({ project, id }) {
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteProjectStatus, setConfirmDeleteProjectStatus] =
    useState(false);

  const [shareStatus, setShareStatus] = useState(false);
  // initialize pattern id, if there is no pattern for the project, give it a id which is stored in database, there is no effect to de detail page, otherwise it will throw error.
  const patternId = project.pattern
    ? project.pattern
    : "64a3135fcee80e505638d800";

  const { mutate } = useSWR("/api/project");
  const { data: pattern } = useSWR(`/api/pattern?id=${patternId}`);

  function onEdit() {
    setIsEdit(true);
  }
  const router = useRouter();
  if (!pattern) {
    return;
  }

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
  function openWin() {
    window.open(`/pattern/${patternId}`);
  }

  //the function for share the project
  function handleShareProject() {
    const postName = project.name;
    const postImage = project.image;

    const response = fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postName, postImage }),
    });

    setShareStatus(true);
    setTimeout(() => {
      setShareStatus(false);
    }, 2000);
  }

  if (!pattern) {
    return;
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
            pattern={pattern}
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
            <ImageWrapper radius="2rem">
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
                  {project.status === "completed"
                    ? dayjs(project.details[0].end).format("DD-MM-YYYY")
                    : "not finished"}
                </LightFont>
              </DetailRowSection>
            </ProjectSectionContainer>

            <ProjectSectionContainer>
              <SubTitle>
                <ColoredFont>Pattern</ColoredFont>
              </SubTitle>
              {project.pattern ? (
                <PatternSection>
                  <StyledButton
                    width="6rem"
                    height="1.5rem"
                    radius="1rem"
                    onClick={openWin}
                  >
                    show pattern
                  </StyledButton>
                  <p>{pattern?.body?.patternName}</p>
                </PatternSection>
              ) : (
                <LightFont>no pattern for this project</LightFont>
              )}
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
              <StyledButton
                width="8rem"
                height="3rem"
                fontSize="1.2rem"
                onClick={confirmDelete}
              >
                Delete
              </StyledButton>
              <StyledButton
                width="8rem"
                height="3rem"
                fontSize="1.2rem"
                onClick={onEdit}
              >
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
          {shareStatus && (
            <>
              <SharedInfo>post to community successfully</SharedInfo>
              <BackDrop />
            </>
          )}
          <AddItemButton onClick={handleShareProject} fontSize="2rem">
            <FontAwesomeIcon icon={faShare} />
          </AddItemButton>
          <Navigation />
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
const PatternSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const ButtonRowSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 3rem;
`;
const SharedInfo = styled.span`
  position: fixed;
  bottom: 9rem;
  right: 4rem;
  width: 15rem;
  height: 6rem;
  border-radius: 1rem;
  text-align: center;
  line-height: 6rem;
  color: var(--color-orange);
  background-color: var(--color-grey);
  box-shadow: 0.1rem 0.1rem 0.6rem var(--color-shadow-grey);
  z-index: 9999;
`;
