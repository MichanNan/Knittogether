import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export default function BackIcon({ handleGoBack }) {
  return (
    <BackItem onClick={handleGoBack}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </BackItem>
  );
}
const BackItem = styled.div`
  position: absolute;
  left: 2.5rem;
  top: 0.5rem;
`;
