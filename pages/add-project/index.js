import Heading from "../../components/Heading";
import AddProjectForm from "../../components/AddProjectForm";
import styled from "styled-components";
import BackIcon from "../../components/Icon/Back";
import Navigation from "../../components/Layout";
import { useRouter } from "next/router";

export default function AddProjectPage({
  projectName,
  handleAddProjectSubmit,
  handleChangeProjectStatus,
  handleChangeProjectFeeling,
}) {
  const router = useRouter();

  function handleGoBack() {
    router.push("/");
  }

  return (
    <>
      <Main>
        <Heading>
          <BackIcon handleGoBack={handleGoBack} />
          {projectName}
        </Heading>
        <AddProjectForm
          onCancel={handleGoBack}
          handleAddProjectSubmit={handleAddProjectSubmit}
          handleChangeProjectStatus={handleChangeProjectStatus}
          handleChangeProjectFeeling={handleChangeProjectFeeling}
        />
        <Navigation />
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
