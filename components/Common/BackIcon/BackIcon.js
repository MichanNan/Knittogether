import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function BackIcon({ handleGoBack }) {
  return (
    <BackItem onClick={handleGoBack}>
      <FontAwesomeIcon icon={faChevronLeft} title="back" />
    </BackItem>
  );
}
const BackItem = styled.span`
  position: absolute;
  left: 2.5rem;
  z-index: 99;
`;
