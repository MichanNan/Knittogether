import dayjs from "dayjs";
export function handleProjectRestructure(data, projectName) {
  const newStart = new Date(data.start);
  const newEnd = new Date(data.end);
  const newProject = {
    name: projectName,
    status: data.status,
    happiness: data.happiness,
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
    note: data.note,
  };
  return newProject;
}
