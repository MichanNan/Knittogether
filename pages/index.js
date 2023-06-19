import Heading from "../components/Heading";
import Projects from "../components/Projects";
import Navigation from "../components/Layout/index";
import styled from "styled-components";

export default function Home() {
  return (
    <Main>
      <Heading>My Projects</Heading>

      <Projects />

      <Navigation />
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
