import Heading from "../../components/Common/Heading";
import Projects from "../../components/Project/Projects";
import Navigation from "../../components/Common/Navigation/index";

import PreAddProject from "../../components/Project/PreAddProject";
import Categories from "../../components/Project/Categories";
import SearchBar from "../../components/Project/SearchBar";
import { useState } from "react";
import { Main, ColoredFont, BackDrop, AddItemButton } from "../../styles";
import styled from "styled-components";
import Header from "../../components/Common/Heading";

export default function ProjectPage({ projectsList, setProjectName, router }) {
  const [addNewProjectStatus, setAddNewProjectStatus] = useState(false);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState("");
  const [inputQuery, setInputQuery] = useState();

  function handleAddNewProject() {
    setAddNewProjectStatus(!addNewProjectStatus);
  }

  if (!projectsList) {
    return;
  }
  function handlePreAddSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setProjectName(data.name);
    router.push("/add-project");
  }

  function handleCancel() {
    setAddNewProjectStatus(false);
  }

  //get the status of a project
  function handleStatusClick(event) {
    const selectedButtonClassName = event.target.className;
    const projectStatus = selectedButtonClassName.split(" ")[2];

    if (projectStatus == selectedProjectStatus) {
      setSelectedProjectStatus("");
    } else setSelectedProjectStatus(projectStatus);
  }

  //initial date for filter according to project status
  let selectedProjects;

  //if user clicked a status show corresponding projects
  selectedProjectStatus === ""
    ? (selectedProjects = projectsList)
    : (selectedProjects = projectsList.filter((project) => {
        return project.status === selectedProjectStatus;
      }));

  const searchedProject = selectedProjects.filter((project) => {
    return project.name.toLowerCase().includes(inputQuery);
  });

  return (
    <Main>
      {addNewProjectStatus && (
        <BackDrop
          onClick={() => {
            setAddNewProjectStatus(!addNewProjectStatus);
          }}
        />
      )}
      <Header>My Projects</Header>
      <Categories
        handleClick={handleStatusClick}
        selectedProjectStatus={selectedProjectStatus}
      />
      <AddItemButton onClick={handleAddNewProject}>+</AddItemButton>
      {addNewProjectStatus && (
        <PreAddProject
          onCancel={handleCancel}
          handlePreAddSubmit={handlePreAddSubmit}
        />
      )}

      {/* render subtitle according to different status */}
      {!selectedProjectStatus && projectsList.length !== 0 && (
        <ProjectSumInfo>
          You have totally&nbsp;
          <ColoredFont>{projectsList.length} </ColoredFont>&nbsp;
          {projectsList.length === 1 ? "project" : "projects"}
        </ProjectSumInfo>
      )}
      {!selectedProjectStatus && projectsList.length === 0 && (
        <ProjectSumInfo>
          You have no projects, maybe &nbsp;<ColoredFont>add</ColoredFont>
          &nbsp;one?
        </ProjectSumInfo>
      )}
      {selectedProjects.length !== 0 && selectedProjectStatus && (
        <ProjectSumInfo>
          you have&nbsp;
          <ColoredFont>
            {selectedProjects.length} &nbsp;
            {selectedProjectStatus}
          </ColoredFont>
          &nbsp; {selectedProjects.length === 1 ? "project" : "projects"}
        </ProjectSumInfo>
      )}
      {selectedProjects.length === 0 && selectedProjectStatus && (
        <ProjectSumInfo>
          you have&nbsp;
          <ColoredFont>
            no &nbsp;
            {selectedProjectStatus}
          </ColoredFont>
          &nbsp;project
        </ProjectSumInfo>
      )}

      <SearchBar
        // handleProjectSearch={handleProjectSearch}
        inputQuery={inputQuery}
        setInputQuery={setInputQuery}
      />
      {!inputQuery && !selectedProjectStatus && (
        <Projects projectsList={projectsList} />
      )}
      {!inputQuery && <Projects projectsList={selectedProjects} />}
      {inputQuery && <Projects projectsList={searchedProject} />}

      <Navigation />
    </Main>
  );
}

const ProjectSumInfo = styled.span`
  display: flex;
  position: absolute;
  top: 9rem;
  font-size: 0.8rem;
  font-weight: 700;
`;
