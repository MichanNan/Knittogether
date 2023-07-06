import styled from "styled-components";
import { ButtonContainer } from "../../../styles";

import Heading from "../../Common/Heading";
import StyledInput from "../../Common/StyledInput";
import StyledButton from "../../Common/StyledButton";
import BackIcon from "../../Common/BackIcon/BackIcon";

import Upload from "../../Common/Upload";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function YarnStockForm({
  setAddYarnStockStatus,
  isYarnEdit,
  setIsYarnEdit,
  editedYarnStock,
}) {
  const [yarnImageUrl, setYarnImageUrl] = useState("");

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
          <YarnInput
            name="brand"
            defaultValue={editedYarnStock.brand}
            maxLength={10}
          />
          <label htmlFor="type">Type</label>
          <YarnInput
            name="type"
            defaultValue={editedYarnStock.type}
            maxLength={10}
          />
          <label htmlFor="gramm">Weight per skein</label>
          <YarnInput
            name="gramm"
            defaultValue={editedYarnStock.gramm}
            maxLength={10}
          />
          <label htmlFor="meter">Length per skein</label>
          <YarnInput
            name="meter"
            defaultValue={editedYarnStock.meter}
            maxLength={10}
          />
          <label htmlFor="color">Color</label>
          <YarnInput
            name="color"
            defaultValue={editedYarnStock.color}
            maxLength={10}
          />
          <label htmlFor="skein">Skein</label>
          <YarnInput
            name="skein"
            defaultValue={editedYarnStock.skein}
            maxLength={10}
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
          <YarnInput name="brand" maxLength={10} />
          <label htmlFor="type">Type</label>
          <YarnInput name="type" maxLength={10} />
          <label htmlFor="gramm">Weight per skein</label>
          <YarnInput name="gramm" maxLength={10} />
          <label htmlFor="meter">Length per skein</label>
          <YarnInput name="meter" maxLength={10} />
          <label htmlFor="color">Color</label>
          <YarnInput name="color" maxLength={10} />
          <label htmlFor="skein">Skein</label>
          <YarnInput name="skein" maxLength={10} />

          <ButtonContainer>
            <StyledButton
              width="8rem"
              height="3rem"
              fontSize="1.2rem"
              onClick={handleCancelAddYarnStock}
            >
              Cancel
            </StyledButton>
            <StyledButton width="8rem" height="3rem" fontSize="1.2rem">
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
const YarnInput = styled(({ name, defaultValue, maxLength }) => (
  <StyledInput
    width="15rem"
    height="3rem"
    radius="1rem"
    backgroundColor="var(--color-grey)"
    name={name}
    defaultValue={defaultValue}
    maxLength={maxLength}
  />
))``;
