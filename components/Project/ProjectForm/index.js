import styled from "styled-components";
import StyledButton from "../../Common/StyledButton";
import StyledInput from "../../Common/StyledInput";
import { ColoredFont, SubTitle, ButtonContainer } from "../../../styles";

import Upload from "../../Common/Upload";
import YarnItem from "../YarnItem";

import { uid } from "uid";
import { useState } from "react";
import { useEffect } from "react";
import { handleProjectRestructure } from "../handleProjectRestructure";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function ProjectForm({
  isEdit,
  setIsEdit,
  project,
  buttonContentLeft,
  buttonContentRight,
  projectName,
}) {
  const buttonPosition = 52;
  const buttonPositionIndex = 11.2;
  //initial data for edit mode(edit a detail page)
  const [existedYarn, setExistedYarn] = useState([]);
  //initial data for create mode(creating a new project)
  let yarnDataOrg = [
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
  ];
  useEffect(() => {
    if (isEdit) {
      let initialYarn = project?.yarn ? project.yarn : yarnData;
      initialYarn.map((a) => {
        a.id = uid();
        delete a._id;
      });
      setExistedYarn(initialYarn);
    }
  }, [isEdit]);

  //store the new created yarn data in the state
  const [yarnData, setYarnData] = useState(yarnDataOrg);

  //to get the image url store url in projectImageUrl state
  const [projectImageUrl, setProjectImageUrl] = useState("");

  const router = useRouter();
  const { mutate } = useSWR("/api/project");

  //cancel form
  function handleCancel() {
    if (isEdit) {
      setIsEdit(false);
    } else {
      router.push("/project");
    }
  }

  //function for update project information in edit mode
  async function handleUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let newProject = handleProjectRestructure(
      data,
      data.name,
      existedYarn,
      projectImageUrl
    );

    const response = await fetch(`/api/project?id=${project._id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    setIsEdit(!isEdit);
    mutate();
  }

  //function for create a new project
  async function handleCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const newProject = handleProjectRestructure(
      data,
      projectName,
      yarnData,
      projectImageUrl
    );

    const response = await fetch("/api/project", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newProject }),
    });

    router.push("/project");
    mutate();
  }

  // function for add more yarn in create mode
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
  //function for delete yarn input field in create mode
  function handleDeleteYarn(id) {
    const allYarn = [...yarnData];
    allYarn.splice(
      allYarn.findIndex((yarn) => yarn.id === id),
      1
    );
    setYarnData(allYarn);
  }
  //function for create more yarn input field in edit mode
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

  //function for delete yarn input field in edit mode
  function handleDeleteExistedYarn(id) {
    const allYarn = [...existedYarn];

    allYarn.splice(
      allYarn.findIndex((yarn) => yarn.id === id),
      1
    );
    setExistedYarn(allYarn);
    setYarnData(allYarn);
  }

  //function for input change(controlled input)
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

  //function for update yarn information in edit mode
  function handleExistedInputChange(event, id) {
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
      <ProjectItemForm onSubmit={!isEdit ? handleCreate : handleUpdate}>
        {/* -----------------------------------------------------start status and happiness select section------------------------------------------ */}
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
        <Upload
          setProjectImageUrl={setProjectImageUrl}
          isProjectEdit={isEdit}
          existedProject={project}
        />
        {/* -----------------------------------------------------end status and happiness select section------------------------------------------ */}
        {/* ----------------------------------------------------------start name input section------------------------------------------------------- */}
        <ColumnSection>
          <label htmlFor="name" required="required">
            Name
          </label>
          <ProjectInput
            name="name"
            type="text"
            maxLength={20}
            defaultValue={isEdit ? project.name : projectName}
          />
        </ColumnSection>
        {/* --------------------------------------------------------------end name input section------------------------------------------------------- */}
        {/* --------------------------------------------------------------start details input section-------------------------------------------------- */}
        <ColumnSection>
          <section>
            <SubTitle>
              <ColoredFont>Details</ColoredFont>
            </SubTitle>
          </section>
          <label htmlFor="recipient" required="required">
            The project is for
          </label>
          <ProjectInput
            name="recipient"
            type="text"
            maxLength={20}
            defaultValue={isEdit ? project.details[0].recipient : ""}
          />
          <label htmlFor="size">Size</label>
          <ProjectInput
            name="size"
            type="text"
            maxLength={5}
            defaultValue={isEdit ? project.details[0].size : ""}
          />
          <label htmlFor="gauge">Gauge</label>
          <ProjectInput
            name="gauge"
            type="text"
            maxLength={10}
            defaultValue={isEdit ? project.details[0].gauge : ""}
          />
          <label htmlFor="needlesize">Needle Size</label>
          <ProjectInput
            name="needlesize"
            type="text"
            maxLength={10}
            defaultValue={isEdit ? project.details[0].needleSize : ""}
          />
          <label htmlFor="start">Start at</label>
          <ProjectInput
            name="start"
            type="date"
            defaultValue={isEdit ? project.details[0].start : ""}
          />
          <label htmlFor="end">End at</label>
          <ProjectInput
            name="end"
            type="date"
            defaultValue={isEdit ? project.details[0].end : ""}
          />
        </ColumnSection>
        {/* -------------------------------------------------------------end detail input section------------------------------------------------------- */}
        {/* --------------------------------------------------------start yarn input section------------------------------------------------------------- */}
        {/* -------------------render when create project and there is no yarn input field ---------------*/}
        <ColumnSection>
          {!isEdit && yarnData.length === 0 && (
            <YarnFormSection>
              <SubTitle>
                <ColoredFont>Add new yarn</ColoredFont>
              </SubTitle>
              <ToggleYarnButton
                left="16rem"
                top={`${buttonPosition}rem`}
                onClick={handleAddYarnClick}
              >
                +
              </ToggleYarnButton>
            </YarnFormSection>
          )}
          {/* ---------------render when create project and there is yarn input field -----------------*/}
          {!isEdit &&
            yarnData.map((yarn, index) => (
              <YarnFormSection key={yarn.id}>
                <SubTitle>
                  <ColoredFont>Yarn</ColoredFont>
                </SubTitle>
                <ToggleYarnButton
                  left="20rem"
                  top={`${buttonPosition + index * buttonPositionIndex}rem`}
                  onClick={handleAddYarnClick}
                >
                  +
                </ToggleYarnButton>
                <ToggleYarnButton
                  left="17rem"
                  top={`${buttonPosition + index * buttonPositionIndex}rem`}
                  onClick={() => handleDeleteYarn(yarn.id)}
                >
                  -
                </ToggleYarnButton>
                <YarnItem
                  defaultYarn={yarn}
                  handleInputChange={handleInputChange}
                />
              </YarnFormSection>
            ))}
          {/* --------------render when edit project and there is no yarn input field -----------------*/}
          {isEdit && existedYarn.length === 0 && (
            <YarnFormSection>
              <SubTitle>
                <ColoredFont>Add new yarn</ColoredFont>
              </SubTitle>
              <ToggleYarnButton
                left="16rem"
                top="55rem"
                onClick={handleAddExistedYarnClick}
              >
                {" "}
                +
              </ToggleYarnButton>
            </YarnFormSection>
          )}

          {/* -----------------render when edit project and there is yarn input field -----------------*/}
          {isEdit &&
            existedYarn.map((yarn, index) => (
              <YarnFormSection key={yarn.id}>
                <SubTitle>
                  <ColoredFont>Yarn</ColoredFont>
                </SubTitle>
                <ToggleYarnButton
                  left="20rem"
                  top={`${buttonPosition + index * buttonPositionIndex}rem`}
                  onClick={handleAddExistedYarnClick}
                >
                  +
                </ToggleYarnButton>
                <ToggleYarnButton
                  left="17rem"
                  top={`${buttonPosition + index * buttonPositionIndex}rem`}
                  onClick={() => handleDeleteExistedYarn(yarn.id)}
                >
                  -
                </ToggleYarnButton>
                <YarnItem
                  defaultYarn={yarn}
                  isEdit={isEdit}
                  handleInputChange={handleExistedInputChange}
                />
              </YarnFormSection>
            ))}
        </ColumnSection>
        {/* --------------------------------------------------------------end yarn input section------------------------------------------------------- */}

        {/* --------------------------------------------------------------start note input section---------------------------------------------------- */}
        <NoteSection>
          <label htmlFor="note">
            <SubTitle>
              <ColoredFont>Note</ColoredFont>
            </SubTitle>
          </label>
          <StyledTextArea name="note" />
        </NoteSection>
        {/* --------------------------------------------------------------end note input section------------------------------------------------------- */}
        {/* --------------------------------------------------------------start button section------------------------------------------------------- */}
        <ButtonContainer>
          <StyledButton
            type="cancel"
            width="8rem"
            height="3rem"
            onClick={handleCancel}
          >
            {buttonContentLeft}
          </StyledButton>
          <StyledButton type="submit" width="8rem" height="3rem">
            {buttonContentRight}
          </StyledButton>
          {/* --------------------------------------------------------------end button section------------------------------------------------------- */}
        </ButtonContainer>
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
  background-color: var(--color-grey);
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

  gap: 0.5rem;
`;
const YarnFormSection = styled.section`
  width: 120%;
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
  color: var(--color-white);
  background-color: var(--color-orange);
  box-shadow: 0.1rem 0.1rem 0.3rem var(--color-shadow);
`;
const ProjectInput = styled(({ name, defaultValue, type, maxLength }) => (
  <StyledInput
    radius="0.5rem"
    height="2rem"
    width="20rem"
    backgroundColor="var(--color-grey)"
    name={name}
    defaultValue={defaultValue}
    type={type}
    maxLength={maxLength}
  />
))``;
