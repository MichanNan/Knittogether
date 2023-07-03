import { useState } from "react";
import styled from "styled-components";
import StyledButton from "../../Common/StyledButton";
import StyledInput from "../../Common/StyledInput";
import { ButtonContainer } from "../../../styles";

export default function PreAddProject({ onCancel, handlePreAddSubmit }) {
  const [inputName, setInputName] = useState("");
  return (
    <AddProjectNameForm onSubmit={(event) => handlePreAddSubmit(event)}>
      <label htmlFor="name">Add the Project Name</label>
      <StyledInput
        width="15rem"
        height="3rem"
        radius="1rem"
        name="name"
        backgroundColor="var(--color-white)"
        defaultValue={inputName}
        onChange={(event) => setInputName(event.target.value)}
        required="required"
      />
      <ButtonContainer>
        <StyledButton width="5rem" height="2rem" onClick={onCancel}>
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
  background-color: var(--color-grey);
  align-items: center;
  border-radius: 2rem;
  z-index: 99;
`;
