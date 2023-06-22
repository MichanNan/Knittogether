import Heading from "../components/Heading";
import Projects from "../components/Projects";
import Navigation from "../components/Navigation/index";
import AddButton from "../components/AddButton";
import styled from "styled-components";
import PreAddProject from "../components/PreAddProject";
import Categories from "../components/Categories";
import { useState } from "react";

export default function Home({ handlePreAddSubmit, projectsList }) {
  const [addNewProjectStatus, setAddNewProjectStatus] = useState(false);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState("active");

  function handleAddNewProject() {
    setAddNewProjectStatus(!addNewProjectStatus);
  }

  function handleCancel() {
    setAddNewProjectStatus(false);
  }

  function handleStatusClick(event) {
    const selectedButtonClassName = event.target.className;
    const projectStatus = selectedButtonClassName.split(" ")[2];
    setSelectedProjectStatus(projectStatus);
  }

  const seletedProjects = projectsList.filter((project) => {
    return project.status === selectedProjectStatus;
  });

  let subTitle = "";
  if (seletedProjects.length === 0) {
    subTitle = `You have no
  ${selectedProjectStatus} projects`;
  } else if (seletedProjects.length === 1) {
    subTitle = `You have ${seletedProjects.length}
    ${selectedProjectStatus} ${"project"}
     `;
  } else {
    subTitle = `You have ${seletedProjects.length}
  ${selectedProjectStatus} projects
   `;
  }
  return (
    <Main>
      {addNewProjectStatus && (
        <BackDrop
          onClick={() => {
            setAddNewProjectStatus(!addNewProjectStatus);
          }}
        />
      )}
      <Heading>My Projects</Heading>
      <Categories
        handleClick={handleStatusClick}
        selectedProjectStatus={selectedProjectStatus}
      />
      <AddButton handleClick={handleAddNewProject} />
      {addNewProjectStatus && (
        <PreAddProject
          onCancel={handleCancel}
          handlePreAddSubmit={handlePreAddSubmit}
        />
      )}
      <ProjectSumInfo>{subTitle}</ProjectSumInfo>

      <Projects projectsList={seletedProjects} />

      <Navigation />
    </Main>
  );
}

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  margin: 0 auto;
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  float: right;
  width: 375px;
  height: 100%;
  background-color: #cccccc;
  opacity: 0.4;
  z-index: 99;
`;

const ProjectSumInfo = styled.p`
  position: absolute;
  top: 10rem;
`;
