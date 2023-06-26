import Heading from "../../components/Heading";
import ProjectForm from "../../components/ProjectForm";
import BackIcon from "../../components/Icon/BackIcon";
import Navigation from "../../components/Navigation";
import { Main } from "../../styles";
export default function AddProjectPage({
  onCancel,
  projectName,
  onSubmit,
  setYarnData,
  yarnData,
}) {
  return (
    <>
      <Main>
        <Heading>
          <BackIcon handleGoBack={onCancel} />
          {projectName}
        </Heading>
        <ProjectForm
          yarnData={yarnData}
          setYarnData={setYarnData}
          projectName={projectName}
          shouldUseDefaultValue={false}
          onCancel={onCancel}
          onSubmit={onSubmit}
          buttonContentLeft="Cancel"
          buttonContentRight="Create"
          isEdit={false}
        />
        <Navigation />
      </Main>
    </>
  );
}
