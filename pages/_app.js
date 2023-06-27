import GlobalStyle from "../styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { SWRConfig } from "swr";
import useSWR from "swr";
import { handleProjectRestructure } from "../components/handleProjectRestructure";
import { Lato } from "@next/font/google";
import { uid } from "uid";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700"],
});
const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [projectName, setProjectName] = useState("");

  const [yarnData, setYarnData] = useState([
    {
      id: uid(),
      brand: "",
      type: "",
      color: "",
      type: "",
      skein: "",
      color: "",
      gramm: "",
      meter: "",
    },
  ]);

  const router = useRouter();

  const { data: projects, mutate } = useSWR("/api/project", fetcher);

  function handlePreAddSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
    setProjectName(data.name);
    router.push("/add-project");
  }

  async function handleAddProjectSubmit(event) {
    event.preventDefault();
    console.log("_app", event.target);
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newProject = handleProjectRestructure(data, projectName, yarnData);

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
    <main className={lato.className}>
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
          onDelete={handleDeleteProject}
          onCancel={handleGoBack}
          setYarnData={setYarnData}
          yarnData={yarnData}
        />
      </SWRConfig>
    </main>
  );
}
