import styled from "styled-components";
import Image from "next/image";

export default function Navigation() {
  return (
    <Nav>
      <Image
        src="/list_FILL0_wght400_GRAD0_opsz48.svg"
        alt="project-list"
        width={60}
        height={60}
      />
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  height: 4rem;
  color: red;
  width: 100%;
  text-align: center;
  background-color: #ffffff;
`;
