import GlobalStyle from "../styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
// import useRestructureProject from "../components/custom-hooks/useRestructureProject";
import { SWRConfig } from "swr";
import useSWR from "swr";
import dayjs from "dayjs";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [projectName, setProjectName] = useState("");

  const [newProjectStatus, setNewProjectStatus] = useState("");
  const [newProjectFeeling, setNewProjectFeeling] = useState("");

  const router = useRouter();

  const { data: projects, mutate } = useSWR("/api/project", fetcher);

  // const { handleAddProjectSubmit } = useProjectsList(
  //   projectName,
  //   newProjectStatus,
  //   newProjectFeeling,
  //   mutate
  // );
  // handleAddProjectSubmit;

  async function handleAddProjectSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newStart = new Date(data.start);
    const newEnd = new Date(data.end);
    const newProject = {
      name: projectName,
      status: newProjectStatus,
      happiness: newProjectFeeling,
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
    const response = await fetch("/api/project", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newProject }),
    });

    router.push("/");
    mutate();
  }

  function handlePreAddSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setProjectName(data.name);
    router.push("/add-project");
  }
  function handleChangeProjectStatus(event) {
    event.preventDefault();
    setNewProjectStatus(event.target.value);
  }
  function handleChangeProjectFeeling(event) {
    event.preventDefault();
    setNewProjectFeeling(event.target.value);
  }

  async function handleDeleteProject(projectId) {
    const response = fetch("/api/project", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectId),
    });
    mutate();
    router.push("/");
  }

  if (!projects) {
    return;
  }
  function handleGoBack() {
    router.push("/");
  }

  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Head>
          <title>Capstone Project</title>
        </Head>
        <Component
          {...pageProps}
          handlePreAddSubmit={handlePreAddSubmit}
          projectName={projectName}
          onSubmit={handleAddProjectSubmit}
          projectsList={projects}
          handleChangeProjectStatus={handleChangeProjectStatus}
          handleChangeProjectFeeling={handleChangeProjectFeeling}
          onDelete={handleDeleteProject}
          onCancel={handleGoBack}
        />
      </SWRConfig>
    </>
  );
}
