import GlobalStyle from "../styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { SWRConfig } from "swr";
import useSWR from "swr";
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

  const { data: projects } = useSWR("/api/project", fetcher);

  return (
    <main className={lato.className}>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <Head>
          <title>Capstone Project</title>
        </Head>
        <Component
          {...pageProps}
          projectName={projectName}
          setProjectName={setProjectName}
          projectsList={projects}
          setYarnData={setYarnData}
          yarnData={yarnData}
          router={router}
          projects={projects}
        />
      </SWRConfig>
    </main>
  );
}
