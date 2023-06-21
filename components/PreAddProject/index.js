import { useState } from "react";
import styled from "styled-components";
import StyledButton from "../styles/StyledButton";
import StyledInput from "../styles/StyledInput";

export default function PreAddProject({ onCancel, handlePreAddSubmit }) {
  const [inputName, setInputName] = useState("");
  return (
    <AddProjectNameForm onSubmit={(e) => handlePreAddSubmit(e)}>
      <label htmlFor="name">Add the Project Name</label>
      <StyledInput
        width="15rem"
        height="3rem"
        radius="1rem"
        name="name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        required="required"
      />
      <ButtonContainer>
        <StyledButton
          width="5rem"
          height="2rem"
          type="cancel"
          onClick={onCancel}
        >
          Cancel
        </StyledButton>
        <StyledButton width="5rem" height="2rem" type="submit">
          Create
        </StyledButton>
      </ButtonContainer>
    </AddProjectNameForm>
  );
}

const AddProjectNameForm = styled.form`
  position: fixed;
  bottom: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 20rem;
  height: 15rem;
  background-color: #fff8de;
  align-items: center;
  border-radius: 2rem;
  z-index: 99;
`;

const ButtonContainer = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-evenly;
`;
