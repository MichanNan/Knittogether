import styled from "styled-components";
import { signOut } from "next-auth/react";
import { LightFont } from "../../../styles";
import { useRouter } from "next/router";

export default function Header({ children, checkOut }) {
  const router = useRouter();

  function handleClick() {
    localStorage.clear();
    signOut({ callbackUrl: "http://localhost:3000/" });
  }
  return (
    <>
      <Heading>
        <ChildrenWrapper>{children}</ChildrenWrapper>
        <InfoWrapper>
          {!checkOut && <LightFont onClick={handleClick}>Sign out</LightFont>}
        </InfoWrapper>
      </Heading>
    </>
  );
}
const Heading = styled.h1`
  position: fixed;
  top: 0;
  text-align: center;
  width: 100%;
  height: 5rem;
  line-height: 6rem;
  font-size: 1.5rem;
  font-weight: 400;
  background-color: var(--color-white);
  z-index: 1;
`;

const ChildrenWrapper = styled.div`
  margin: 0 auto;
`;
const InfoWrapper = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 1rem;
  font-size: 0.8rem;
  line-height: 0.8rem;
`;
