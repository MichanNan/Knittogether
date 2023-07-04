import Heading from "../../Common/Heading";
import BackIcon from "../../Common/BackIcon/BackIcon";

import styled from "styled-components";
import { ButtonContainer } from "../../../styles";
import StyledInput from "../../Common/StyledInput";
import StyledButton from "../../Common/StyledButton";

import { useRouter } from "next/router";
import useSWR from "swr";

export default function NeedleStockForm({
  setAddNeedleStockStatus,
  isNeedleEdit,
  setIsNeedleEdit,
  editedNeedleStock,
}) {
  const router = useRouter();
  const { mutate } = useSWR("/api/needle");
  const id = editedNeedleStock?._id;

  function handleCancelAddNeedleStock() {
    setAddNeedleStockStatus(false);
  }

  async function handleAddNewNeedleStock(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("data", data);
    console.log("call api,request.body.type", typeof JSON.stringify(data));
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

  function handleCancelEditNeedleStock() {
    setIsNeedleEdit(false);
  }

  async function handleUpdateNeedleStockSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await fetch(`/api/needle?id=${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    mutate();
    setIsNeedleEdit(false);
  }
  return (
    <>
      {isNeedleEdit ? (
        <Heading>
          <BackIcon handleGoBack={handleCancelEditNeedleStock} />
          Edit Needle
        </Heading>
      ) : (
        <Heading>
          <BackIcon handleGoBack={handleCancelAddNeedleStock} />
          Add Needle
        </Heading>
      )}

      {isNeedleEdit ? (
        <NeedleForm onSubmit={(event) => handleUpdateNeedleStockSubmit(event)}>
          <label htmlFor="size">Size:</label>
          <NeedleInput
            name="size"
            defaultValue={editedNeedleStock.size}
            maxLength={10}
          />
          <label htmlFor="length">Length:</label>
          <NeedleInput
            name="length"
            defaultValue={editedNeedleStock.length}
            maxLength={10}
          />
          <label htmlFor="amount">Amount:</label>
          <NeedleInput
            name="amount"
            defaultValue={editedNeedleStock.amount}
            maxLength={10}
          />
          <ButtonContainer>
            <StyledButton
              width="8rem"
              height="3rem"
              onClick={handleCancelEditNeedleStock}
            >
              Cancel
            </StyledButton>
            <StyledButton width="8rem" height="3rem">
              Confirm
            </StyledButton>
          </ButtonContainer>
        </NeedleForm>
      ) : (
        <NeedleForm onSubmit={handleAddNewNeedleStock}>
          <label htmlFor="size">Size:</label>
          <NeedleInput name="size" maxLength={10} />
          <label htmlFor="length">Length:</label>
          <NeedleInput name="length" maxLength={10} />
          <label htmlFor="amount">Amount:</label>
          <NeedleInput name="amount" maxLength={10} />
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
      )}
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
const NeedleInput = styled(({ name, defaultValue, maxLength }) => (
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
