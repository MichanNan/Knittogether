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

  function handlePreAddSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    setProjectName(data.name);
    router.push("/add-project");
  }
  function handleChangeProjectStatus(e) {
    e.preventDefault();
    setNewProjectStatus(e.target.value);
  }
  function handleChangeProjectFeeling(e) {
    e.preventDefault();
    setNewProjectFeeling(e.target.value);
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
