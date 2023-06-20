import GlobalStyle from "../styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { mockProjects } from "../db/projects";
import { uid } from "uid";
import dayjs from "dayjs";

export default function App({ Component, pageProps }) {
  const [projectName, setProjectName] = useState("");
  const [projectsList, setProjectsList] = useState(mockProjects);
  const [projectStatus, setProjectStatus] = useState("");
  const [feeling, setFeeling] = useState("");

  const router = useRouter();

  function handlePreAddSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    setProjectName(data.name);
    router.push("/add-project");
  }
  function handleChangeProjectStatus(e) {
    e.preventDefault();
    setProjectStatus(e.target.value);
  }
  function handleChangeProjectFeeling(e) {
    e.preventDefault();
    setFeeling(e.target.value);
  }
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
    setProjectsList([...projectsList, newProject]);

    router.push("/");
  }

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Component
        {...pageProps}
        handlePreAddSubmit={handlePreAddSubmit}
        projectName={projectName}
        handleAddProjectSubmit={handleAddProjectSubmit}
        projectsList={projectsList}
        handleChangeProjectStatus={handleChangeProjectStatus}
        handleChangeProjectFeeling={handleChangeProjectFeeling}
      />
    </>
  );
}
