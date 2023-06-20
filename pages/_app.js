import GlobalStyle from "../styles";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [projectName, setProjectName] = useState("");
  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    setProjectName(data.name);
    router.push("/add-project");
  }
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Component
        {...pageProps}
        handleSubmit={handleSubmit}
        projectName={projectName}
      />
    </>
  );
}
