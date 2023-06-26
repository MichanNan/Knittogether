import styled from "styled-components";
import StyledInput from "../StyledInput";
import { useEffect } from "react";
// import { useEffect } from "react";
export default function YarnItem({ defaultYarn, isEdit, handleInputChange }) {
  return (
    <>
      <YarnWrapper>
        <label htmlFor="brand">Brand</label>
        <StyledInput
          name="brand"
          type="text"
          radius="0.5rem"
          height="2rem"
          width="7rem"
          backgoundColor="#f5f5f5"
          defaultValue={isEdit ? defaultYarn.brand : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        ></StyledInput>
        <label htmlFor="skein">Skein</label>
        <StyledInput
          name="skein"
          type="text"
          radius="0.5rem"
          height="2rem"
          width="7rem"
          backgoundColor="#f5f5f5"
          defaultValue={isEdit ? defaultYarn?.skein : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        ></StyledInput>
        <label htmlFor="type">Type</label>
        <StyledInput
          name="type"
          type="text"
          radius="0.5rem"
          height="2rem"
          width="7rem"
          backgoundColor="#f5f5f5"
          defaultValue={isEdit ? defaultYarn.type : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        ></StyledInput>
        <label htmlFor="color">color</label>
        <StyledInput
          name="color"
          type="text"
          radius="0.5rem"
          height="2rem"
          width="7rem"
          backgoundColor="#f5f5f5"
          defaultValue={isEdit ? defaultYarn.color : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        ></StyledInput>
        <label htmlFor="gramm">Gramm</label>
        <StyledInput
          name="gramm"
          type="text"
          radius="0.5rem"
          height="2rem"
          width="7rem"
          backgoundColor="#f5f5f5"
          defaultValue={isEdit ? defaultYarn?.gramm : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        ></StyledInput>
        <label htmlFor="meter">Meter</label>
        <StyledInput
          name="meter"
          type="text"
          radius="0.5rem"
          height="2rem"
          width="7rem"
          backgoundColor="#f5f5f5"
          defaultValue={isEdit ? defaultYarn.meter : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        ></StyledInput>
      </YarnWrapper>
    </>
  );
}
const YarnWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 15% 35%);
  grid-template-rows: repeat(3, 33.33%);
  grid-gap: 0.5rem 0rem;
  z-index: 99;
`;
