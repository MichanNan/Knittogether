import styled from "styled-components";
import { ButtonContainer, InputItem } from "../../../styles";

import Heading from "../../Common/Heading";
import StyledInput from "../../Common/StyledInput";
import StyledButton from "../../Common/StyledButton";
import BackIcon from "../../Common/BackIcon/BackIcon";

import Upload from "../../Common/Upload";
import { useState } from "react";
import useSWR from "swr";

export default function YarnStockForm({
  setAddYarnStockStatus,
  isYarnEdit,
  setIsYarnEdit,
  editedYarnStock,
}) {
  const initYarnImage = isYarnEdit ? editedYarnStock.image : "";
  const [yarnImageUrl, setYarnImageUrl] = useState(initYarnImage);

  const { mutate } = useSWR("/api/yarn");

  const id = editedYarnStock?._id;
  async function handleAddYarnStockSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const response = await fetch("/api/yarn", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, image: yarnImageUrl }),
    });
    mutate();
    setAddYarnStockStatus(false);
  }

  function handleCancelAddYarnStock() {
    setAddYarnStockStatus(false);
  }

  function handleCancelEditYarnStock() {
    setIsYarnEdit(false);
  }
  async function handleUpdateYarnStockSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await fetch(`/api/yarn?id=${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, image: yarnImageUrl }),
    });
    mutate();
    setIsYarnEdit(false);
  }
  return (
    <>
      {isYarnEdit ? (
        <Heading>
          <BackIcon
            handleGoBack={(event) => handleCancelEditYarnStock(event)}
          />
          Edit Yarn
        </Heading>
      ) : (
        <Heading>
          <BackIcon handleGoBack={handleCancelAddYarnStock} />
          Add Yarn
        </Heading>
      )}

      {isYarnEdit ? (
        <YarnForm onSubmit={handleUpdateYarnStockSubmit}>
          <Upload
            setYarnImageUrl={setYarnImageUrl}
            isYarnEdit={isYarnEdit}
            editedYarnStock={editedYarnStock}
          />

          <label htmlFor="brand">Brand</label>
          <YarnInput name="brand" defaultValue={editedYarnStock.brand} />
          <label htmlFor="type">Type</label>
          <YarnInput name="type" defaultValue={editedYarnStock.type} />
          <label htmlFor="gramm">Weight per skein</label>
          <YarnInput name="gramm" defaultValue={editedYarnStock.gramm} />
          <label htmlFor="meter">Length per skein</label>
          <YarnInput name="meter" defaultValue={editedYarnStock.meter} />
          <label htmlFor="color">Color</label>
          <YarnInput name="color" defaultValue={editedYarnStock.color} />
          <label htmlFor="skein">Skein</label>
          <YarnInput name="skein" defaultValue={editedYarnStock.skein} />

          <ButtonContainer>
            <StyledButton
              width="8rem"
              height="3rem"
              onClick={handleCancelAddYarnStock}
            >
              Cancel
            </StyledButton>
            <StyledButton width="8rem" height="3rem">
              Confirm
            </StyledButton>
          </ButtonContainer>
        </YarnForm>
      ) : (
        <YarnForm onSubmit={(event) => handleAddYarnStockSubmit(event)}>
          <Upload setYarnImageUrl={setYarnImageUrl} />
          <label htmlFor="brand">Brand</label>
          <YarnInput name="brand" />
          <label htmlFor="type">Type</label>
          <YarnInput name="type" />
          <label htmlFor="gramm">Weight per skein</label>
          <YarnInput name="gramm" />
          <label htmlFor="meter">Length per skein</label>
          <YarnInput name="meter" />
          <label htmlFor="color">Color</label>
          <YarnInput name="color" />
          <label htmlFor="skein">Skein</label>
          <YarnInput name="skein" />

          <ButtonContainer>
            <StyledButton
              width="8rem"
              height="3rem"
              onClick={handleCancelAddYarnStock}
            >
              Cancel
            </StyledButton>
            <StyledButton width="8rem" height="3rem">
              Create
            </StyledButton>
          </ButtonContainer>
        </YarnForm>
      )}
    </>
  );
}

const YarnForm = styled.form`
  margin-top: 4rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 3rem;
`;
const YarnInput = styled(({ name, defaultValue }) => (
  <StyledInput
    width="15rem"
    height="3rem"
    radius="1rem"
    backgroundColor="#f5f5f5"
    name={name}
    defaultValue={defaultValue}
  />
))``;
