import styled from "styled-components";
import StyledButton from "../StyledButton";
import StyledInput from "../StyledInput";
import Upload from "../Upload";

export default function AddProjectForm({
  onCancel,
  handleAddProjectSubmit,
  handleChangeProjectStatus,
  handleChangeProjectFeeling,
}) {
  return (
    <>
      <ProjectForm onSubmit={(event) => handleAddProjectSubmit(event)}>
        <RowSection>
          <label htmlFor="status">status</label>
          <StyledSelect
            name="status"
            onChange={(event) => handleChangeProjectStatus(event)}
            required
          >
            <option value="">--status--</option>
            <option value="planned">Planned</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="hibernated">Hibernated</option>
          </StyledSelect>
          <label htmlFor="happiness">Feeling</label>
          <StyledSelect
            name="feeling"
            onChange={(event) => handleChangeProjectFeeling(event)}
          >
            <option value="">--feeling--</option>
            <option value="excited">Excited</option>
            <option value="happy">Happy</option>
            <option value="normal">Normal</option>
            <option value="bad">Bad</option>
          </StyledSelect>
        </RowSection>
        <Upload />
        <ColumnSection>
          <label htmlFor="recipient" required="required">
            The project is for
          </label>
          <StyledInput name="recipient" type="text" maxLength="20" />
          <label htmlFor="recipient">To</label>
          <StyledInput name="recipient" type="text" />
          <label htmlFor="size">Size</label>
          <StyledInput name="size" type="text" maxLength="5" />
          <label htmlFor="gauge">Gauge</label>
          <StyledInput name="gauge" type="text" maxLength="10" />
          <label htmlFor="needlesize">Needel Size</label>
          <StyledInput name="needlesize" type="text" />
          <label htmlFor="start">Start at</label>
          <StyledInput name="start" type="date" />
          <label htmlFor="end">End at</label>
          <StyledInput name="end" type="date" />
        </ColumnSection>

        <ColumnSection>
          <label htmlFor="brand">Brand</label>
          <StyledInput name="brand" type="text" />
          <label htmlFor="skeins">Skeins</label>
          <StyledInput name="skeins" type="text" maxLength="5" />
          <label htmlFor="type">Type</label>
          <StyledInput name="type" type="text" maxLength="20" />
          <label htmlFor="gramm">Gramm</label>
          <StyledInput name="gramm" type="text" maxLength="5" />
          <label htmlFor="color">Color</label>
          <StyledInput name="color" type="text" maxLength="20" />
          <label htmlFor="meter">Meter</label>
          <StyledInput name="meter" type="text" maxLength="10" />
        </ColumnSection>
        <ColumnSection>
          <label htmlFor="note">Note</label>
          <StyledTextArea name="note" />
        </ColumnSection>
        <RowSection>
          <StyledButton
            type="cancel"
            width="8rem"
            height="3rem"
            onClick={onCancel}
          >
            Cancel
          </StyledButton>
          <StyledButton type="submit" width="8rem" height="3rem">
            Save
          </StyledButton>
        </RowSection>
      </ProjectForm>
    </>
  );
}
const ProjectForm = styled.form`
  position: absolute;
  top: 6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 80%;
  padding-bottom: 5rem;
`;
const RowSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;
`;
const ColumnSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
`;
const StyledTextArea = styled.textarea`
  border-radius: 0.6rem;
  border: none;
  background-color: #f5f5f5;
  box-shadow: 0.1rem 0.1rem 0.4rem #cccccc;
  font-size: 1.5rem;
`;

const StyledSelect = styled.select`
  width: 6rem;
  height: 2rem;
`;
