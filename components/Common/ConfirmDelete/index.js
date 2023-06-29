import styled from "styled-components";
import StyledButton from "../StyledButton";
import { ButtonContainer, BackDrop } from "../../../styles";

export default function ConfirmDelete({
  projectId,
  cancelDelete,
  onDelete,
  deleteYarnStockStatus,
  yarnId,
  handleDeleteExistedYarn,
  cancelDeleteYarnStock,
}) {
  let deleteItem = "";
  if (deleteYarnStockStatus) {
    deleteItem = "yarn";
  } else {
    deleteItem = "project";
  }

  return (
    <>
      <Wrapper>
        <p>{`Are you sure to delete the ${deleteItem}?`}</p>
        {!deleteYarnStockStatus && (
          <ButtonContainer>
            <StyledButton width="6rem" height="2rem" onClick={cancelDelete}>
              Cancel
            </StyledButton>
            <StyledButton
              width="6rem"
              height="2rem"
              onClick={() => onDelete(projectId)}
            >
              Delete
            </StyledButton>
          </ButtonContainer>
        )}
        {deleteYarnStockStatus && (
          <ButtonContainer>
            <StyledButton
              width="6rem"
              height="2rem"
              onClick={cancelDeleteYarnStock}
            >
              Cancel
            </StyledButton>
            <StyledButton
              width="6rem"
              height="2rem"
              onClick={() => handleDeleteExistedYarn(yarnId)}
            >
              Delete
            </StyledButton>
          </ButtonContainer>
        )}
      </Wrapper>
      <BackDrop onClick={cancelDeleteYarnStock} />
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
  z-index: 9999;
  background-color: #f5f5f5;
`;
