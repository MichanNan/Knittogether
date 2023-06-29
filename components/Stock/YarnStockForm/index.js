import styled from "styled-components";
import { ButtonContainer } from "../../../styles";

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
  buttonContentLeft,
  buttonContentRight,
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
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="brand"
            backgroundColor="#f5f5f5"
            defaultValue={editedYarnStock.brand}
          />
          <label htmlFor="type">Type</label>
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="type"
            backgroundColor="#f5f5f5"
            defaultValue={editedYarnStock.type}
          />
          <label htmlFor="gramm">Weight per skein</label>
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="gramm"
            backgroundColor="#f5f5f5"
            defaultValue={editedYarnStock.gramm}
          />
          <label htmlFor="meter">Length per skein</label>
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="meter"
            backgroundColor="#f5f5f5"
            defaultValue={editedYarnStock.meter}
          />
          <label htmlFor="color">Color</label>
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="color"
            backgroundColor="#f5f5f5"
            defaultValue={editedYarnStock.color}
          />
          <label htmlFor="skein">Skein</label>
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="skein"
            backgroundColor="#f5f5f5"
            defaultValue={editedYarnStock.skein}
          />

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
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="brand"
            backgroundColor="#f5f5f5"
          />
          <label htmlFor="type">Type</label>
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="type"
            backgroundColor="#f5f5f5"
          />
          <label htmlFor="gramm">Weight per skein</label>
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="gramm"
            backgroundColor="#f5f5f5"
          />
          <label htmlFor="meter">Length per skein</label>
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="meter"
            backgroundColor="#f5f5f5"
          />
          <label htmlFor="color">Color</label>
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="color"
            backgroundColor="#f5f5f5"
          />
          <label htmlFor="skein">Skein</label>
          <StyledInput
            width="15rem"
            height="3rem"
            radius="1rem"
            name="skein"
            backgroundColor="#f5f5f5"
          />

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
