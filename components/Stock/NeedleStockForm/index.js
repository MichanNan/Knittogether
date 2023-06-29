import Heading from "../../Common/Heading";
import BackIcon from "../../Common/BackIcon/BackIcon";

import styled from "styled-components";
import { ButtonContainer } from "../../../styles";
import StyledInput from "../../Common/StyledInput";
import StyledButton from "../../Common/StyledButton";

import { useRouter } from "next/router";
import useSWR from "swr";

export default function NeedleStockForm({ setAddNeedleStockStatus }) {
  const router = useRouter();
  const { mutate } = useSWR("/api/needle");
  function handleCancelAddNeedleStock() {
    setAddNeedleStockStatus(false);
  }

  async function handleAddNewNeedleStock(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await fetch("/api/needle", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    mutate();
    setAddNeedleStockStatus(false);
  }
  return (
    <>
      <Heading>
        <BackIcon handleGoBack={(event) => handleCancelAddNeedleStock(event)} />
        Add Needle
      </Heading>
      <NeedleForm onSubmit={handleAddNewNeedleStock}>
        <label htmlFor="size">Size:</label>
        <NeedleInput name="size" />
        <label htmlFor="length">Length:</label>
        <NeedleInput name="length" />
        <label htmlFor="amount">Amount:</label>
        <NeedleInput name="amount" />
        <ButtonContainer>
          <StyledButton
            width="8rem"
            height="3rem"
            onClick={handleCancelAddNeedleStock}
          >
            Cancel
          </StyledButton>
          <StyledButton width="8rem" height="3rem">
            Create
          </StyledButton>
        </ButtonContainer>
      </NeedleForm>
    </>
  );
}

const NeedleForm = styled.form`
  margin-top: 4rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 3rem;
`;
const NeedleInput = styled(({ name, defaultValue }) => (
  <StyledInput
    width="15rem"
    height="3rem"
    radius="1rem"
    backgroundColor="#f5f5f5"
    name={name}
    defaultValue={defaultValue}
  />
))``;