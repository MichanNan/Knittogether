import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/router";
import styled from "styled-components";
import Heading from "../components/Common/Heading";
import { ColoredFont, HeavyFont, LightFont, Main, StyledLink } from "../styles";
import StyledInput from "../components/Common/StyledInput";
import StyledButton from "../components/Common/StyledButton";
import Header from "../components/Common/Heading";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return "";
  }
  if (data) {
    router.push("/home");
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Main>
      <Header checkOut>Login </Header>
      <InfoContainer>
        <Info fontSize="1.5rem">
          Welcome &nbsp;
          <HeavyFont>
            <ColoredFont>Back</ColoredFont>&nbsp;
          </HeavyFont>
        </Info>
      </InfoContainer>
      <LoginForm onSubmit={submitHandler}>
        <LoginLabel htmlFor="eamil">Email</LoginLabel>
        <StyledInput
          name="email"
          id="email"
          width="15rem"
          height="2rem"
          radius="0.6rem"
          backgroundColor="var(--color-grey)"
          fontSize="1.2rem"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></StyledInput>
        <LoginLabel htmlFor="password">Password</LoginLabel>
        <StyledInput
          type="password"
          name="password"
          width="15rem"
          height="2rem"
          radius="0.6rem"
          backgroundColor="var(--color-grey)"
          fontSize="1.2rem"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></StyledInput>
        <Link href="/register">
          <LightFont>Click here to create a new account</LightFont>
        </Link>
        <StyledButton
          width="6rem"
          height="2rem"
          fontSize="1.2rem"
          type="submit"
        >
          Log in
        </StyledButton>
      </LoginForm>
    </Main>
  );
}

const LoginForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const InfoContainer = styled.div`
  margin-top: 6rem;
`;
const Info = styled.p`
  margin-top: 1rem;
  margin-left: ${({ left }) => left};
  font-size: ${({ fontSize }) => fontSize};
  text-align: center;
`;
const LoginLabel = styled.label`
  align-self: start;
`;
const Link = styled(StyledLink)`
  transform: translateX(1rem);
  font-size: 0.8rem;
`;
