import Heading from "../../components/Heading";
import ProjectForm from "../../components/ProjectForm";
import BackIcon from "../../components/Icon/BackIcon";
import Navigation from "../../components/Navigation";
import { useRouter } from "next/router";
import { Main } from "../../styles";
export default function AddProjectPage({
  onCancel,
  projectName,
  onSubmit,
  handleChangeProjectStatus,
  handleChangeProjectFeeling,
}) {
  const router = useRouter();

  return (
    <>
      <Main>
        <Heading>
          <BackIcon handleGoBack={onCancel} />
          {projectName}
        </Heading>
        <ProjectForm
          shouldUseDefaultValue={false}
          onCancel={onCancel}
          onSubmit={onSubmit}
          handleChangeProjectStatus={handleChangeProjectStatus}
          handleChangeProjectFeeling={handleChangeProjectFeeling}
          buttonContentLeft="Cancel"
          buttonContentRight="Create"
        />
        <Navigation />
      </Main>
    </>
  );
}
