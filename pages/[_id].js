import { useRouter } from "next/router";
import ProjectDetail from "../components/ProjectDetail";

export default function ProjectDetailPgae({
  projectsList,
  onDelete,
  onCancel,
  onSubmit,
  handleChangeProjectStatus,
  handleChangeProjectFeeling,
  setYarnData,
  yarnData,
}) {
  const router = useRouter();

  const { _id: id } = router.query;

  const project = projectsList.find((project) => {
    return project._id === id;
  });

  if (!project) {
    return;
  }
  return (
    <>
      <ProjectDetail
        id={id}
        project={project}
        onDelete={onDelete}
        onCancel={onCancel}
        onSubmit={onSubmit}
        handleChangeProjectFeeling={handleChangeProjectFeeling}
        handleChangeProjectStatus={handleChangeProjectStatus}
        setYarnData={setYarnData}
        yarnData={yarnData}
      />
    </>
  );
}
