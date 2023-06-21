import Heading from "../components/Heading";
import Projects from "../components/Projects";
import Navigation from "../components/Layout/index";
import AddButton from "../components/AddButton";
import styled from "styled-components";
import PreAddProject from "../components/PreAddProject";

import { useState } from "react";

export default function Home({ handlePreAddSubmit, projectsList }) {
  const [addNewProjectStatus, setAddNewProjectStatus] = useState(false);

  function handleAddNewProject() {
    setAddNewProjectStatus(!addNewProjectStatus);
  }

  function handleCancel() {
    setAddNewProjectStatus(false);
  }

  return (
    <Main addNewProjectStatus={addNewProjectStatus}>
      <Heading>My Projects</Heading>
      <AddButton handleClick={handleAddNewProject} />
      {addNewProjectStatus && (
        <BackDrop
          onClick={() => {
            setAddNewProjectStatus(!addNewProjectStatus);
          }}
        />
      )}
      {addNewProjectStatus && (
        <PreAddProject
          onCancel={handleCancel}
          handlePreAddSubmit={handlePreAddSubmit}
        />
      )}
      <Projects projectsList={projectsList} />
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
  float: right;
  width: 375px;
  height: 100%;
  background-color: #cccccc;
  opacity: 0.4;
  z-index: 5;
`;
