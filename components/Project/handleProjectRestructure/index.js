export function handleProjectRestructure(
  data,
  projectName,
  yarnData,
  projectImageUrl,
  patternId
) {
  const startDate = data.start ? data.start : "not available";
  const endDate = data.end ? data.end : "not available";
  const newProject = {
    name: projectName,
    status: data.status,
    happiness: data.happiness,
    image: projectImageUrl,
    details: [
      {
        recipient: data.recipient,
        size: data.size,
        gauge: data.gauge,
        needleSize: data.needlesize,
        start: startDate,
        end: endDate,
      },
    ],
    pattern: patternId,
    yarn: yarnData,
    note: data.note,
  };
  return newProject;
}
