import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function useRestructureProject(
  data,
  projectName,
  projectStatus,
  newStart,
  newEnd
) {
  const newProject = {
    name: projectName,
    status: projectStatus,
    happiness: feeling,
    image: "/cumulustee.jpg",
    details: [
      {
        recipient: data.recipient,
        size: data.size,
        gauge: data.gauge,
        needleSize: data.needlesize,
        start: dayjs(newStart).format("DD-MM-YYYY"),
        end: dayjs(newEnd).format("DD-MM-YYYY"),
      },
    ],
    pattern: "",
    yarn: [
      {
        brand: data.brand,
        skeins: data.skeins,
        type: data.type,
        gramm: data.gramm,
        color: data.color,
        meter: data.meter,
      },
    ],
    note: "",
  };
  return newProject;
}
