import { useState } from "react";
import styled from "styled-components";
import {
  ColoredFont,
  HeavyFont,
  LightFont,
  Main,
  StyledLink,
} from "../../styles";
import StyledInput from "../../components/Common/StyledInput";
import StyledButton from "../../components/Common/StyledButton";
import Heading from "../../components/Common/Heading";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Common/Heading";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  function handleNameOnChange(event) {
    setErrorMessage("");
    setName(event.target.value);
  }
  function handleEmailOnChange(event) {
    setErrorMessage("");
    setEmail(event.target.value);
  }
  function handlePasswordOnChange(event) {
    setErrorMessage("");
    setPassword(event.target.value);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const jsonResponse = await response.json();
      console.log("json response", jsonResponse);
      if (!response.ok) {
        setErrorMessage(jsonResponse.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Main>
      <Header checkOut>Register</Header>

      <InfoContainer>
        <Info left="-2rem">
          Welcome to &nbsp;
          <HeavyFont>
            <ColoredFont>Knittogether</ColoredFont>&nbsp;
          </HeavyFont>
        </Info>

        <Info left="6rem" fontSize="1.2rem">
          <ColoredFont>Sign up</ColoredFont> now
        </Info>
        <Info left="2rem">
          Let&apos;s
          <HeavyFont>
            <ColoredFont>knitting!</ColoredFont>
          </HeavyFont>
        </Info>
      </InfoContainer>
      <RegisterForm onSubmit={submitHandler}>
        <RegisterLabel htmlFor="name">name</RegisterLabel>
        <StyledInput
          name="name"
          id="name"
          value={name}
          width="15rem"
          height="2rem"
          radius="0.6rem"
          backgroundColor="var(--color-grey)"
          onChange={(event) => handleNameOnChange(event)}
        ></StyledInput>

        <RegisterLabel htmlFor="eamil">Email</RegisterLabel>
        <StyledInput
          name="email"
          id="email"
          value={email}
          width="15rem"
          height="2rem"
          radius="0.6rem"
          backgroundColor="var(--color-grey)"
          onChange={(event) => handleEmailOnChange(event)}
        ></StyledInput>
        <RegisterLabel htmlFor="password">Password</RegisterLabel>
        <StyledInput
          type="password"
          name="password"
          id="password"
          value={password}
          width="15rem"
          height="2rem"
          radius="0.6rem"
          backgroundColor="var(--color-grey)"
          onChange={(event) => handlePasswordOnChange(event)}
        ></StyledInput>

        {errorMessage && (
          <Info>
            <HeavyFont>
              <ColoredFont>{errorMessage}</ColoredFont>
            </HeavyFont>
          </Info>
        )}

        <Link href="/">
          <LightFont>Already have an account? Click here to login</LightFont>
        </Link>
        <StyledButton
          width="6rem"
          height="2rem"
          fontSize="1.2rem"
          type="submit"
        >
          sign up
        </StyledButton>
      </RegisterForm>
    </Main>
  );
}

const RegisterForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const InfoContainer = styled.div`
  margin-top: 3rem;
`;
const Info = styled.p`
  margin-top: 1rem;
  margin-left: ${({ left }) => left};
  font-size: ${({ fontSize }) => fontSize};
`;
const RegisterLabel = styled.label`
  align-self: start;
`;
const Link = styled(StyledLink)`
  transform: translateX(1rem);
  font-size: 0.8rem;
`;
