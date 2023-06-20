import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function AddButton({ handleClick }) {
  return (
    <AddProjectButton onClick={handleClick}>
      <FontAwesomeIcon icon={faCirclePlus} />
    </AddProjectButton>
  );
}

const AddProjectButton = styled.div`
  position: fixed;
  right: 4rem;
  bottom: 6rem;
  font-size: 3.5rem;
  z-index: 99;
`;
