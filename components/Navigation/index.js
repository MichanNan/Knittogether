import { StyledLink } from "../../styles";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";

export default function Navigation() {
  const [selectedNavItem, setSelectedNavItem] = useLocalStorageState(
    "selectedNavItem",
    { defaultValue: "" }
  );

  function handleNavOnClick(event) {
    event.preventDefault();
    setSelectedNavItem(event.target.innerText.toLowerCase());
  }

  return (
    <Nav>
      <NavItem
        onClick={(event) => handleNavOnClick(event)}
        className="projects"
        selectedNavItem={selectedNavItem}
      >
        <StyledLink href="/">Projects</StyledLink>
      </NavItem>

      <NavItem
        onClick={(event) => handleNavOnClick(event)}
        className="stocks"
        selectedNavItem={selectedNavItem}
      >
        <StyledLink href="/stock">Stocks</StyledLink>
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
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 4rem;
  width: 100%;
  text-align: center;
  background-color: #ffffff;
  text-decoration: none;
`;
const NavItem = styled.div`
  width: 50%;
  background-color: #fff;
  border-left: solid 0.1rem
    ${({ selectedNavItem, className }) =>
      selectedNavItem && className.includes(selectedNavItem)
        ? " #e07008"
        : "#fff"};
  border-right: solid 0.1rem
    ${({ selectedNavItem, className }) =>
      selectedNavItem && className.includes(selectedNavItem)
        ? " #e07008"
        : "#fff"};
  color: ${({ selectedNavItem, className }) =>
    selectedNavItem && className.includes(selectedNavItem)
      ? " #e07008"
      : "#000"};
`;
//
