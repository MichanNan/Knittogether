import Heading from "../../components/Heading";
import AddProjectForm from "../../components/AddProjectForm";
import styled from "styled-components";
export default function AddProjectPage({ projectName }) {
  console.log(projectName);
  return (
    <>
      <Main>
        <Heading>{projectName}</Heading>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <AddProjectForm />
      </Main>
    </>
  );
}

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 375px;
  margin: 0 auto;
`;
