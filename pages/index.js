import Heading from "../components/Heading";
import Projects from "../components/Projects";
import Navigation from "../components/Layout/index";
import AddButton from "../components/AddButton";
import styled from "styled-components";
import PreAddProject from "../components/PreAddProject";
import Categories from "../components/Categories";
import { useState } from "react";

export default function Home({ handlePreAddSubmit, projectsList }) {
  const [addNewProjectStatus, setAddNewProjectStatus] = useState(false);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState("planned");

  function handleAddNewProject() {
    setAddNewProjectStatus(!addNewProjectStatus);
  }

  function handleCancel() {
    setAddNewProjectStatus(false);
  }

  function filterProject(status) {
    const filteredProjects = projectsList.filter((project) => {
      return project.status === status;
    });
    return filteredProjects;
  }
  const plannedProject = filterProject("planned");
  const activeProject = filterProject("active");
  const completedProject = filterProject("completed");
  const hibernatedProject = filterProject("hibernating");

  function handleStatusClick(e) {
    const selectedButtonClassName = e.target.className;
    setSelectedProjectStatus(selectedButtonClassName);
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
      <Categories handleClick={handleStatusClick} />
      <AddButton handleClick={handleAddNewProject} />

      {addNewProjectStatus && (
        <PreAddProject
          onCancel={handleCancel}
          handlePreAddSubmit={handlePreAddSubmit}
        />
      )}
      {selectedProjectStatus.includes("planned") && (
        <Projects projectsList={plannedProject} />
      )}
      {selectedProjectStatus.includes("active") && (
        <Projects projectsList={activeProject} />
      )}
      {selectedProjectStatus.includes("completed") && (
        <Projects projectsList={completedProject} />
      )}
      {selectedProjectStatus.includes("hibernating") && (
        <Projects projectsList={hibernatedProject} />
      )}

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
