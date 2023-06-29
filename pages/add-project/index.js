import Heading from "../../components/Common/Heading";
import ProjectForm from "../../components/Project/ProjectForm";
import BackIcon from "../../components/Common/BackIcon/BackIcon";
import { Main } from "../../styles";
export default function AddProjectPage({
  onCancel,
  projectName,
  onSubmit,
  setYarnData,
  yarnData,
}) {
  console.log(yarnData);
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
      </Main>
    </>
  );
}
