import styled from "styled-components";
import StyledButton from "../../Common/StyledButton";
import { ButtonContainer, BackDrop } from "../../../styles";

export default function ConfirmDeleteProject({ id, cancelDelete, onDelete }) {
  return (
    <>
      <Wrapper>
        <p>Are you sure to delete the project?</p>
        <ButtonContainer>
          <StyledButton width="6rem" height="2rem" onClick={cancelDelete}>
            Cancel
          </StyledButton>
          <StyledButton width="6rem" height="2rem" onClick={() => onDelete(id)}>
            Delete
          </StyledButton>
        </ButtonContainer>
      </Wrapper>
      <BackDrop />
    </>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  gap: 2rem;
  position: absolute;
  bottom: 10rem;
  left: 3rem;
  width: 18rem;
  height: 10rem;
  z-index: 999;
  background-color: #f5f5f5;
`;
