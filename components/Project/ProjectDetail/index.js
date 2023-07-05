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
import Navigation from "../../Common/Navigation";

export default function ProjectDetail({ project, id }) {
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteProjectStatus, setConfirmDeleteProjectStatus] =
    useState(false);
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
  // if (!pattern) {
  //   return;
  // }

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

  // async function handleDownload() {
  //   fetch(`/api/pattern?id=${patternId}`, {
  //     method: "get",
  //   })
  //     .then((response) => {
  //       //read ReadableStream response
  //       const reader = response.body.getReader();
  //       return new ReadableStream({
  //         start(controller) {
  //           return pump();
  //           function pump() {
  //             return reader.read().then(({ done, value }) => {
  //               // When no more data needs to be consumed, close the stream
  //               if (done) {
  //                 controller.close();
  //                 return;
  //               } // Enqueue the next data chunk into our target stream
  //               controller.enqueue(value);
  //               return pump();
  //             });
  //           }
  //         },
  //       });
  //     })
  //     .then((stream) => new Response(stream)) // Create an object URL for the response
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       return blob.text();
  //     })
  //     .then((text) => {
  //       const Pattern = JSON.parse(text).body;
  //       console.log(Pattern);
  //       if (Pattern.totalChunkNumber) {
  //         if (Pattern.nextChunkId) {
  //         } else {
  //         }
  //       }
  //       const downloaded64 = Pattern.fileBase64String;

  //       let downFile = base64toFile(downloaded64, Pattern.patternName);
  //       console.log("downFile", downFile);
  //       const objectURL = window.URL.createObjectURL(downFile);
  //       // const iframe = document.getElementById("view");
  //       const embed = document.getElementById("view");
  //       // iframe.setAttribute("src", objectURL);
  //       embed.setAttribute("src", objectURL);

  //       //var link = document.createElement("a");
  //       //link.href = objectURL;
  //       //link.download = Pattern.patternName;
  //       //link.click();
  //       //window.URL.revokeObjectURL(objectURL);
  //     });

  //   function base64toFile(dataurl, filename) {
  //     let arr = dataurl.split(",");
  //     let mime = arr[0].match(/:(.*?);/)[1];
  //     let suffix = mime.split("/")[1];
  //     let bstr = atob(arr[1]);
  //     let n = bstr.length;
  //     let u8arr = new Uint8Array(n);
  //     while (n--) {
  //       u8arr[n] = bstr.charCodeAt(n);
  //     }
  //     return new File([u8arr], `${filename}.${suffix}`, {
  //       type: mime,
  //     });
  //   }
  // }

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
                  {dayjs(project.details[0].end).format("DD-MM-YYYY")}
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
                    onClick={() => router.push(`/pattern/${patternId}`)}
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
