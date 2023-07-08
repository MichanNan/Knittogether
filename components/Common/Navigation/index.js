import useLocalStorageState from "use-local-storage-state";
import { signOut } from "next-auth/react";

import { StyledLink } from "../../../styles";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faVolleyball } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  const [selectedNavItem, setSelectedNavItem] = useLocalStorageState(
    "selectedNavItem",
    {
      defaultValue: "home",
    }
  );

  function handleNavOnClick(event) {
    event.preventDefault();
    setSelectedNavItem(event.target.innerText?.toLowerCase());
  }

  return (
    <Nav>
      <NavItem
        onClick={(event) => handleNavOnClick(event)}
        className="home"
        selectedNavItem={selectedNavItem}
      >
        <NavLink href="/">
          <FontAwesomeIcon icon={faHouse} />
          Home
        </NavLink>
      </NavItem>

      <NavItem
        onClick={(event) => handleNavOnClick(event)}
        className="projects"
        selectedNavItem={selectedNavItem}
      >
        <NavLink href="/project">
          <FontAwesomeIcon icon={faListCheck} />
          Projects
        </NavLink>
      </NavItem>

      <NavItem
        onClick={(event) => handleNavOnClick(event)}
        className="stocks"
        selectedNavItem={selectedNavItem}
      >
        <NavLink href="/stock">
          <FontAwesomeIcon icon={faBoxArchive} />
          Stocks
        </NavLink>
      </NavItem>

      <NavItem
        onClick={(event) => handleNavOnClick(event)}
        className="pattern"
        selectedNavItem={selectedNavItem}
      >
        <NavLink href="/pattern">
          <FontAwesomeIcon icon={faVolleyball} />
          Pattern
        </NavLink>
      </NavItem>

      <NavItem
        onClick={(event) => handleNavOnClick(event)}
        className="community"
        selectedNavItem={selectedNavItem}
      >
        <NavLink href="community">
          <FontAwesomeIcon icon={faUser} />
          Community
        </NavLink>
      </NavItem>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  height: 4rem;
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  text-align: center;
  background-color: var(--color-white);
  text-decoration: none;
`;
const NavItem = styled.div`
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.6rem;
  width: 50%;
  background-color: var(--color-white);
  color: ${({ selectedNavItem, className }) =>
    selectedNavItem && className.includes(selectedNavItem)
      ? " var(--color-orange)"
      : "var(--color-black)"};
`;
const NavLink = styled(StyledLink)`
  display: flex;
  flex-direction: column;
`;
