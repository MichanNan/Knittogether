import Heading from "../../components/Common/Heading";
import ProjectForm from "../../components/Project/ProjectForm";
import BackIcon from "../../components/Common/BackIcon/BackIcon";
import { Main } from "../../styles";
export default function AddProjectPage({
  projectName,
  setYarnData,
  yarnData,
  router,
}) {
  return (
    <>
      <Main>
        <Heading>
          <BackIcon
            handleGoBack={() => {
              router.back();
            }}
          />
          {projectName}
        </Heading>
        <ProjectForm
          yarnData={yarnData}
          setYarnData={setYarnData}
          projectName={projectName}
          shouldUseDefaultValue={false}
          buttonContentLeft="Cancel"
          buttonContentRight="Create"
          isEdit={false}
        />
      </Main>
    </>
  );
}
