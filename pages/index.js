import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { useRouter } from "next/router";

import {
  ColoredFont,
  HeavyFont,
  LightFont,
  Main,
  AuthForm,
  AuthInfoContainer,
  AuthInfo,
  AuthLabel,
  AuthLink,
} from "../styles";

import StyledInput from "../components/Common/StyledInput";
import StyledButton from "../components/Common/StyledButton";
import Header from "../components/Common/Heading";

export default function LoginPage({ mutate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");

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
      if (!data.ok) {
        setLoginError(data.error);
      }
      mutate();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Main>
      <Header checkOut>Login </Header>
      <AuthInfoContainer>
        <AuthInfo fontSize="1.5rem">
          Welcome &nbsp;
          <HeavyFont>
            <ColoredFont>Back</ColoredFont>&nbsp;
          </HeavyFont>
        </AuthInfo>
      </AuthInfoContainer>
      <AuthForm onSubmit={submitHandler}>
        <AuthLabel htmlFor="eamil">Email</AuthLabel>
        <StyledInput
          name="email"
          id="email"
          width="15rem"
          height="2rem"
          radius="0.6rem"
          backgroundColor="var(--color-grey)"
          fontSize="1.2rem"
          value={email}
          onChange={(e) => {
            setLoginError("");
            setEmail(e.target.value);
          }}
        ></StyledInput>
        <AuthLabel htmlFor="password">Password</AuthLabel>
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
          onChange={(e) => {
            setLoginError("");
            setPassword(e.target.value);
          }}
        ></StyledInput>
        {Object.keys(loginError).length !== 0 && (
          <HeavyFont>
            <ColoredFont>inValid account</ColoredFont>
          </HeavyFont>
        )}
        <AuthLink href="/register">
          <LightFont>Click here to create a new account</LightFont>
        </AuthLink>
        <StyledButton
          width="6rem"
          height="2rem"
          fontSize="1.2rem"
          type="submit"
        >
          Log in
        </StyledButton>
      </AuthForm>
    </Main>
  );
}
