import Heading from "../../components/Heading";
import AddProjectForm from "../../components/AddProjectForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Navigation from "../../components/Layout";
import { useRouter } from "next/router";

export default function AddProjectPage({
  projectName,
  handleAddProjectSubmit,
}) {
  const router = useRouter();

  function handleGoBack() {
    router.push("/");
  }

  return (
    <>
      <Main>
        <Heading>
          <FontAwesomeIcon icon={faChevronLeft} onClick={handleGoBack} />
          {projectName}
        </Heading>
        <AddProjectForm
          onCancel={handleGoBack}
          handleAddProjectSubmit={handleAddProjectSubmit}
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
