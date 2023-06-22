import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  return (
    <Nav>
      <FontAwesomeIcon icon={faListUl} />
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  height: 4rem;
  font-size: 2rem;
  line-height: 4rem;
  width: 100%;
  text-align: center;
  background-color: #ffffff;
  font-weight: 100;
`;
