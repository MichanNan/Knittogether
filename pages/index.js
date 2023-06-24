import Heading from "../components/Heading";
import Projects from "../components/Projects";
import Navigation from "../components/Navigation/index";
import AddButton from "../components/AddButton";
import styled from "styled-components";
import PreAddProject from "../components/PreAddProject";
import Categories from "../components/Categories";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import { Main, ColoredFont, BackDrop } from "../styles";

export default function Home({ handlePreAddSubmit, projectsList }) {
  const [addNewProjectStatus, setAddNewProjectStatus] = useState(false);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState("");
  const [inputQuery, setInputQuery] = useState();

  function handleAddNewProject() {
    setAddNewProjectStatus(!addNewProjectStatus);
  }

  function handleCancel() {
    setAddNewProjectStatus(false);
  }

  function handleStatusClick(event) {
    const selectedButtonClassName = event.target.className;
    const projectStatus = selectedButtonClassName.split(" ")[2];

    if (projectStatus == selectedProjectStatus) {
      setSelectedProjectStatus("");
    } else setSelectedProjectStatus(projectStatus);
  }

  let selectedProjects = projectsList;

  selectedProjectStatus === ""
    ? (selectedProjects = projectsList)
    : (selectedProjects = projectsList.filter((project) => {
        return project.status === selectedProjectStatus;
      }));

  function handleProjectSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    setInputQuery(data["project-search"]);
  }
  const searchedProject = selectedProjects.filter((project) => {
    return project.name.toLowerCase().includes(inputQuery);
  });
  const seletedProjects = projectsList.filter((project) => {
    return project.status === selectedProjectStatus;
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

      {/* render subtitle according to different status */}
      {!selectedProjectStatus && selectedProjects.length !== 0 && (
        <ProjectSumInfo>
          You have totally&nbsp;
          <ColoredFont>{projectsList.length} </ColoredFont>&nbsp;
          {projectsList.length === 1 ? "project" : "projects"}
        </ProjectSumInfo>
      )}
      {!selectedProjectStatus && !selectedProjects.length && (
        <ProjectSumInfo>
          You have no projects, maybe &nbsp;<ColoredFont>add</ColoredFont>
          &nbsp;one?
        </ProjectSumInfo>
      )}
      {seletedProjects.length !== 0 && selectedProjectStatus && (
        <ProjectSumInfo>
          you have&nbsp;
          <ColoredFont>
            {seletedProjects.length} &nbsp;
            {selectedProjectStatus}
          </ColoredFont>
          &nbsp; {selectedProjects.length === 1 ? "project" : "projects"}
        </ProjectSumInfo>
      )}
      {seletedProjects.length === 0 && selectedProjectStatus && (
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
        handleProjectSearch={handleProjectSearch}
        inputQuery={inputQuery}
        setInputQuery={setInputQuery}
      />

      {!inputQuery && <Projects projectsList={selectedProjects} />}
      {inputQuery && <Projects projectsList={searchedProject} />}

      <Navigation />
    </Main>
  );
}

const ProjectSumInfo = styled.p`
  display: felx;
  position: absolute;
  top: 9rem;
  font-size: 0.8rem;
  font-weight: 700;
`;
