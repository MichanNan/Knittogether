import styled from "styled-components";
import StyledButton from "../StyledButton";
import StyledInput from "../StyledInput";
import Upload from "../Upload";
import { ColoredFont, SubTitle } from "../../styles";
import YarnItem from "../YarnItem";
import { uid } from "uid";
import { useState } from "react";
import { useEffect } from "react";
import { set } from "mongoose";

export default function ProjectForm({
  isEdit,
  project,
  onCancel,
  onSubmit,
  buttonContentLeft,
  buttonContentRight,
  projectName,
  yarnData,
  setYarnData,
}) {
  const initialYarn = project?.yarn ? project.yarn : yarnData;
  const [existedYarn, setExistedYarn] = useState(initialYarn);

  useEffect(() => {}, []);

  function handleAddYarnClick() {
    setYarnData([
      ...yarnData,
      {
        id: uid(),
        brand: "",
        type: "",
        color: "",
        type: "",
        skein: "",
        color: "",
        gramm: "",
        meter: "",
      },
    ]);
  }

  function handleDeleteYarn(id) {
    const allYarn = [...yarnData];
    allYarn.splice(
      allYarn.findIndex((yarn) => yarn.id === id),
      1
    );
    setYarnData(allYarn);
  }

  function handleAddExistedYarnClick() {
    setExistedYarn([
      ...existedYarn,
      {
        id: uid(),
        brand: "",
        type: "",
        color: "",
        type: "",
        skein: "",
        color: "",
        gramm: "",
        meter: "",
      },
    ]);
  }
  function handleDeleteExistedYarn(id) {
    const allYarn = [...existedYarn];
    allYarn.splice(
      allYarn.findIndex((yarn) => yarn.id === id),
      1
    );
    setExistedYarn(allYarn);
    setYarnData(allYarn);
  }
  function handleInputChange(event, id) {
    const newYarnData = yarnData.map((yarn) => {
      if (id === yarn.id) {
        const { name, value } = event.target;
        return { ...yarn, [name]: value };
      }
      return yarn;
    });
    setYarnData(newYarnData);
  }
  function handleExsitedInputChange(event, id) {
    const newYarnData = existedYarn.map((yarn) => {
      if (id === yarn.id) {
        const { name, value } = event.target;
        return { ...yarn, [name]: value };
      }
      return yarn;
    });
    setExistedYarn(newYarnData);
    setYarnData(newYarnData);
  }
  return (
    <>
      <ProjectItemForm onSubmit={onSubmit}>
        <RowSection>
          <label htmlFor="status">status</label>
          <StyledSelect
            name="status"
            defaultValue={isEdit ? project.status : ""}
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
            defaultValue={isEdit ? project.happiness : ""}
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
            backgoundColor="#f5f5f5"
            maxLength="20"
            radius="0.5rem"
            height="2rem"
            width="20rem"
            defaultValue={isEdit ? project.name : projectName}
          />
        </ColumnSection>

        <ColumnSection>
          <section>
            <SubTitle>
              <ColoredFont>Details</ColoredFont>
            </SubTitle>
          </section>
          <label htmlFor="recipient" required="required">
            The project is for
          </label>
          <StyledInput
            name="recipient"
            type="text"
            maxLength="20"
            radius="0.5rem"
            height="2rem"
            width="20rem"
            backgoundColor="#f5f5f5"
            defaultValue={isEdit ? project.details[0].recipient : ""}
          />
          <label htmlFor="size">Size</label>
          <StyledInput
            name="size"
            type="text"
            maxLength="5"
            radius="0.5rem"
            height="2rem"
            width="20rem"
            backgoundColor="#f5f5f5"
            defaultValue={isEdit ? project.details[0].size : ""}
          />
          <label htmlFor="gauge">Gauge</label>
          <StyledInput
            name="gauge"
            type="text"
            maxLength="10"
            radius="0.5rem"
            height="2rem"
            width="20rem"
            backgoundColor="#f5f5f5"
            defaultValue={isEdit ? project.details[0].gauge : ""}
          />
          <label htmlFor="needlesize">Needle Size</label>
          <StyledInput
            name="needlesize"
            type="text"
            radius="0.5rem"
            height="2rem"
            width="20rem"
            backgoundColor="#f5f5f5"
            defaultValue={isEdit ? project.details[0].needleSize : ""}
          />
          <label htmlFor="start">Start at</label>
          <StyledInput
            name="start"
            type="date"
            radius="0.5rem"
            height="2rem"
            backgoundColor="#f5f5f5"
            width="20rem"
            defaultValue={isEdit ? project.details[0].start : ""}
          />
          <label htmlFor="end">End at</label>
          <StyledInput
            name="end"
            type="date"
            radius="0.5rem"
            height="2rem"
            width="20rem"
            backgoundColor="#f5f5f5"
            defaultValue={isEdit ? project.details[0].end : ""}
          />
        </ColumnSection>

        <ColumnSection>
          {!isEdit &&
            yarnData.map((yarn, index) => (
              <YarnFormSection key={yarn.id}>
                <SubTitle>
                  <ColoredFont>Yarn</ColoredFont>
                </SubTitle>
                <ToggleYarnButton
                  left="20rem"
                  top={`${42 + index * 11.2}rem`}
                  onClick={handleAddYarnClick}
                >
                  +
                </ToggleYarnButton>
                <ToggleYarnButton
                  left="17rem"
                  top={`${42 + index * 11.2}rem`}
                  onClick={() => handleDeleteYarn(yarn.id)}
                >
                  -
                </ToggleYarnButton>
                <YarnItem
                  defaultYarn={yarn}
                  yarnData={yarnData}
                  setYarnData={setYarnData}
                  handleInputChange={handleInputChange}
                />
              </YarnFormSection>
            ))}
          {isEdit &&
            existedYarn.map((yarn, index) => (
              <YarnFormSection key={yarn.id}>
                <SubTitle>
                  <ColoredFont>Yarn</ColoredFont>
                </SubTitle>
                <ToggleYarnButton
                  left="20rem"
                  top={`${42 + index * 11.2}rem`}
                  onClick={handleAddExistedYarnClick}
                >
                  +
                </ToggleYarnButton>
                <ToggleYarnButton
                  left="17rem"
                  top={`${42 + index * 11.2}rem`}
                  onClick={() => handleDeleteExistedYarn(yarn.id)}
                >
                  -
                </ToggleYarnButton>
                <YarnItem
                  defaultYarn={yarn}
                  yarnData={yarnData}
                  setYarnData={setYarnData}
                  existedYarn={existedYarn}
                  index={index}
                  isEdit={isEdit}
                  handleInputChange={handleExsitedInputChange}
                />
              </YarnFormSection>
            ))}
        </ColumnSection>

        <NoteSection>
          <label htmlFor="note">
            <SubTitle>
              <ColoredFont>Note</ColoredFont>
            </SubTitle>
          </label>
          <StyledTextArea name="note" />
        </NoteSection>
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
        <label htmlFor="brand"></label>
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
  width: 20rem;
  font-size: 1.5rem;
  &:focus {
    outline: none;
  }
`;

const StyledSelect = styled.select`
  width: 6rem;
  height: 2rem;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const RowSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;
const ColumnSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  /* transform: translateX(2rem); */
  gap: 0.5rem;
`;
const YarnFormSection = styled.section`
  width: 120%;
  /* transform: translateX(-2.8rem); */
`;
const NoteSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  margin-top: 1rem;
`;

const ToggleYarnButton = styled.div`
  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  font-size: 1.5rem;
  line-height: 1.3rem;
  border-radius: 1.5rem;
  border: 1px solid transparent;
  width: 1.5rem;
  height: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #fff;
  background-color: #e07008;
  box-shadow: 0.1rem 0.1rem 0.3rem #ad5707;
`;
