import styled from "styled-components";
import StyledButton from "../StyledButton";
import StyledInput from "../StyledInput";
import Upload from "../Upload";
import { ColumnSection } from "../../styles";
import { RowSection } from "../../styles";

export default function ProjectForm({
  isEdit,
  defaultValue,
  onCancel,
  onSubmit,
  buttonContentLeft,
  buttonContentRight,
  projectName,
}) {
  console.log(projectName);
  return (
    <>
      <ProjectItemForm onSubmit={onSubmit}>
        <RowSection>
          <label htmlFor="status">status</label>
          <StyledSelect
            name="status"
            defaultValue={isEdit ? defaultValue.status : ""}
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
            name="happiness"
            defaultValue={isEdit ? defaultValue.happiness : ""}
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
          <label htmlFor="name" required="required">
            Name
          </label>
          <StyledInput
            name="name"
            type="text"
            maxLength="20"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.name : projectName}
          />

          <label htmlFor="recipient" required="required">
            The project is for
          </label>

          <StyledInput
            name="recipient"
            type="text"
            maxLength="20"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.details[0].recipient : ""}
          />

          <label htmlFor="size">Size</label>
          <StyledInput
            name="size"
            type="text"
            maxLength="5"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.details[0].size : ""}
          />
          <label htmlFor="gauge">Gauge</label>
          <StyledInput
            name="gauge"
            type="text"
            maxLength="10"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.details[0].gauge : ""}
          />
          <label htmlFor="needlesize">Needle Size</label>
          <StyledInput
            name="needlesize"
            type="text"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.details[0].needleSize : ""}
          />
          <label htmlFor="start">Start at</label>
          <StyledInput
            name="start"
            type="date"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.details[0].start : ""}
          />
          <label htmlFor="end">End at</label>
          <StyledInput
            name="end"
            type="date"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.details[0].end : ""}
          />
        </ColumnSection>

        <ColumnSection>
          <label htmlFor="brand">Brand</label>
          <StyledInput name="brand" type="text" radius="1rem" height="2rem" />
          <label htmlFor="skeins">Skeins</label>
          <StyledInput
            name="skeins"
            type="text"
            maxLength="5"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.yarn[0].brand : ""}
          />
          <label htmlFor="type">Type</label>
          <StyledInput
            name="type"
            type="text"
            maxLength="20"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.yarn[0].type : ""}
          />
          <label htmlFor="gramm">Gramm</label>
          <StyledInput
            name="gramm"
            type="text"
            maxLength="5"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.yarn[0].gramm : ""}
          />
          <label htmlFor="color">Color</label>
          <StyledInput
            name="color"
            type="text"
            maxLength="20"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.yarn[0].color : ""}
          />
          <label htmlFor="meter">Meter</label>
          <StyledInput
            name="meter"
            type="text"
            maxLength="10"
            radius="1rem"
            height="2rem"
            defaultValue={isEdit ? defaultValue.yarn[0].meter : ""}
          />
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
            {buttonContentLeft}
          </StyledButton>
          <StyledButton type="submit" width="8rem" height="3rem">
            {buttonContentRight}
          </StyledButton>
        </RowSection>
      </ProjectItemForm>
    </>
  );
}
const ProjectItemForm = styled.form`
  position: absolute;
  top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 80%;
  padding-bottom: 5rem;
`;

const StyledTextArea = styled.textarea`
  border-radius: 0.6rem;
  border: none;
  background-color: #f5f5f5;
  font-size: 1.5rem;
`;

const StyledSelect = styled.select`
  width: 6rem;
  height: 2rem;
`;
