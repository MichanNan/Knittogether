import Heading from "../../components/Heading";
import ProjectForm from "../../components/ProjectForm";
import BackIcon from "../../components/Icon/BackIcon";
import Navigation from "../../components/Navigation";
import { Main } from "../../styles";
export default function AddProjectPage({ onCancel, projectName, onSubmit }) {
  return (
    <>
      <Main>
        <Heading>
          <BackIcon handleGoBack={onCancel} />
          {projectName}
        </Heading>
        <ProjectForm
          projectName={projectName}
          shouldUseDefaultValue={false}
          onCancel={onCancel}
          onSubmit={onSubmit}
          buttonContentLeft="Cancel"
          buttonContentRight="Create"
        />
        <Navigation />
      </Main>
    </>
  );
}
