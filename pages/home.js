import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useState } from "react";
import useSWR from "swr";

export default function Home({ projects }) {
  //   const { data: allProjects } = useSWR("/api/project");

  const plannedProject = projects?.filter(
    (project) => project.status === "planned"
  );
  const activeProject = projects?.filter(
    (project) => project.status === "active"
  );
  const completedProject = projects?.filter(
    (project) => project.status === "completed"
  );
  const hibernatedProject = projects?.filter(
    (project) => project.status === "hibernated"
  );

  console.log(
    plannedProject,
    activeProject,
    completedProject,
    hibernatedProject
  );
  const domRef = useRef();
  const charInit = () => {
    const myChart = echarts.init(domRef.current);
    myChart.setOption({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: plannedProject?.length, name: "Planned" },
            { value: activeProject?.length, name: "Active" },
            { value: completedProject?.length, name: "Completed" },
            { value: hibernatedProject?.length, name: "Hibernated" },
          ],
        },
      ],
    });
  };

  useEffect(() => {
    charInit();
  }, [projects]);

  //   if (!projects) {
  //     return;
  //   }
  return (
    <>
      <div ref={domRef} style={{ width: "100vw", height: "100vh" }}></div>
    </>
  );
}
