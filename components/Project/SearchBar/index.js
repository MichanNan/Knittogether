import StyledInput from "../../Common/StyledInput";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ inputQuery, setInputQuery }) {
  return (
    <SearchbarForm>
      <label htmlFor="project-search"></label>
      <StyledInput
        width="18rem"
        height="2rem"
        name="project-search"
        backgroundColor="var(--color-grey)"
        value={inputQuery}
        onChange={(event) => setInputQuery(event.target.value)}
      ></StyledInput>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </SearchbarForm>
  );
}

const SearchbarForm = styled.form`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 11rem;
  padding: 0 1rem;
  background-color: var(--color-grey);
  border-radius: 1rem;
  height: 2.5rem;
`;
