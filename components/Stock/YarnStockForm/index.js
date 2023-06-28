import styled from "styled-components";
import { ButtonContainer } from "../../../styles";

import Heading from "../../Common/Heading";
import StyledInput from "../../Common/StyledInput";
import StyledButton from "../../Common/StyledButton";
import BackIcon from "../../Common/BackIcon/BackIcon";

import Upload from "../../Common/Upload";
import { useState } from "react";
import useSWR from "swr";

export default function YarnStockForm({ setAddYarnStockStatus }) {
  const [imageUrl, setImageUrl] = useState("");
  const { mutate } = useSWR("/api/project");

  async function handleAddYarnStockSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const response = await fetch("/api/yarn", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, image: imageUrl }),
    });

    setAddYarnStockStatus(false);
    mutate();
  }

  function handleCancelAddYarnStock() {
    setAddYarnStockStatus(false);
  }
  return (
    <>
      <Heading>
        <BackIcon handleGoBack={handleCancelAddYarnStock} />
        Add Yarn
      </Heading>

      <YarnForm onSubmit={(event) => handleAddYarnStockSubmit(event)}>
        <Upload setImageUrl={setImageUrl} />
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
    </>
  );
}

const YarnForm = styled.form`
  margin-top: 4rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
