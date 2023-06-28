import styled from "styled-components";
import { ButtonContainer } from "../../../styles";
import Heading from "../../Common/Heading";
import StyledInput from "../../Common/StyledInput";
import StyledButton from "../../Common/StyledButton";
import BackIcon from "../../Common/BackIcon/BackIcon";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function YarnStockForm({ setAddYarnStockStatus }) {
  const { mutate } = useSWR("/api/project");
  const router = useRouter();

  async function handleAddYarnStockSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const response = await fetch("/api/yarn", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
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
            type="cancel"
            onClick={handleCancelAddYarnStock}
          >
            Cancel
          </StyledButton>
          <StyledButton width="8rem" height="3rem" type="submit">
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
