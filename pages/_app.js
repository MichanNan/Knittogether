import GlobalStyle from "../styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useProjectsList } from "../components/custom-hooks/useProjectsList";

export default function App({ Component, pageProps }) {
  const [projectName, setProjectName] = useState("");

  const [newProjectStatus, setNewProjectStatus] = useState("");
  const [newProjectFeeling, setNewProjectFeeling] = useState("");

  const router = useRouter();

  const { handleAddProjectSubmit, projectsList } = useProjectsList(
    projectName,
    newProjectStatus,
    newProjectFeeling
  );

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

  handleAddProjectSubmit;

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
