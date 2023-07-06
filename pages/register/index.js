import { useState } from "react";
import styled from "styled-components";
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
} from "../../styles";
import StyledInput from "../../components/Common/StyledInput";
import StyledButton from "../../components/Common/StyledButton";

import { useRouter } from "next/router";
import Header from "../../components/Common/Heading";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Main>
      <Header checkOut>Register</Header>

      <AuthInfoContainer>
        <AuthInfo left="-2rem">
          Welcome to &nbsp;
          <HeavyFont>
            <ColoredFont>Knittogether</ColoredFont>&nbsp;
          </HeavyFont>
        </AuthInfo>

        <AuthInfo left="6rem" fontSize="1.2rem">
          <ColoredFont>Sign up</ColoredFont> now
        </AuthInfo>
        <AuthInfo left="2rem">
          Let&apos;s &nbsp;
          <HeavyFont>
            <ColoredFont>knitting!</ColoredFont>
          </HeavyFont>
        </AuthInfo>
      </AuthInfoContainer>
      <AuthForm onSubmit={submitHandler}>
        <AuthLabel htmlFor="name">name</AuthLabel>
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

        <AuthLabel htmlFor="eamil">Email</AuthLabel>
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
        <AuthLabel htmlFor="password">Password</AuthLabel>
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
          <AuthInfo>
            <HeavyFont>
              <ColoredFont>{errorMessage}</ColoredFont>
            </HeavyFont>
          </AuthInfo>
        )}
        {loading && <p>registering, please wait a moment</p>}
        <AuthLink href="/">
          <LightFont>Already have an account? Click here to login</LightFont>
        </AuthLink>
        <StyledButton
          width="6rem"
          height="2rem"
          fontSize="1.2rem"
          type="submit"
        >
          sign up
        </StyledButton>
      </AuthForm>
    </Main>
  );
}

// const AuthForm = styled.form`
//   margin-top: 2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 1rem;
// `;

// const AuthInfoContainer = styled.div`
//   margin-top: 3rem;
// `;
// const AuthInfo = styled.p`
//   margin-top: 1rem;
//   margin-left: ${({ left }) => left};
//   font-size: ${({ fontSize }) => fontSize};
// `;
// const AuthLabel = styled.label`
//   align-self: start;
// `;
// const AuthLink = styled(StyledLink)`
//   transform: translateX(1rem);
//   font-size: 0.8rem;
// `;
