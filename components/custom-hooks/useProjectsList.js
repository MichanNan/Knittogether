import { useState } from "react";
import { mockProjects } from "../../db/projects";
import { uid } from "uid";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export function useProjectsList(projectName, projectStatus, feeling) {
  const [projectsList, setProjectsList] = useState(mockProjects);
  const router = useRouter();

  function handleAddProjectSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const newStartDate = new Date(data.start);
    const newEndDate = new Date(data.end);
    const newProject = {
      id: uid(),
      name: projectName,
      status: projectStatus,
      happnisse: feeling,
      image: "/cumulustee.jpg",
      details: {
        recipient: data.recipient,
        size: data.size,
        gauge: data.gauge,
        needleSize: data.needlesize,
        startDate: dayjs(newStartDate).format("DD-MM-YYYY"),
        endDate: dayjs(newEndDate).format("DD-MM-YYYY"),
      },
      pattern: "",
      yarn: {
        brand: data.brand,
        skeins: data.skeins,
        Type: data.type,
        gramm: data.gramm,
        color: data.color,
        meter: data.meter,
      },
      note: "",
    };
    setProjectsList((prev) => [...prev, newProject]);

    router.push("/");
  }

  return { handleAddProjectSubmit, projectsList };
}
