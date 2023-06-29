import { useRouter } from "next/router";
import ProjectDetail from "../components/Project/ProjectDetail";

export default function ProjectDetailPage({ projectsList }) {
  const router = useRouter();

  const { _id: id } = router.query;

  const project = projectsList?.find((project) => {
    return project._id === id;
  });

  if (!project) {
    return;
  }

  return (
    <>
      <ProjectDetail id={id} project={project} />
    </>
  );
}
