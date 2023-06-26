import styled from "styled-components";
import StyledInput from "../StyledInput";
import { useEffect } from "react";
// import { useEffect } from "react";
export default function YarnItem({
  defaultValue,
  isEdit,
  setYarnData,
  yarnCount,
  yarnData,
}) {
  useEffect(() => {
    if (isEdit) {
      setYarnData(defaultValue.yarn);
    }
  }, []);
  // useEffect(() => {
  //   if (isEdit) {
  //     setYarnData(defaultValue.yarn);
  //   }
  // }, [yarnData]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setYarnData((prevData) => {
      const updatedData = [...prevData];
      updatedData[yarnCount] = {
        ...updatedData[yarnCount],
        [name]: value,
      };
      console.log(yarnData);
      return updatedData;
    });
  }
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
          defaultValue={isEdit ? yarnData[yarnCount]?.brand : ""}
          onChange={handleInputChange}
        ></StyledInput>
        <label htmlFor="skein">Skein</label>
        <StyledInput
          name="skein"
          type="text"
          radius="0.5rem"
          height="2rem"
          width="7rem"
          backgoundColor="#f5f5f5"
          defaultValue={isEdit ? yarnData[yarnCount]?.skein : ""}
          onChange={handleInputChange}
        ></StyledInput>
        <label htmlFor="type">Type</label>
        <StyledInput
          name="type"
          type="text"
          radius="0.5rem"
          height="2rem"
          width="7rem"
          backgoundColor="#f5f5f5"
          defaultValue={isEdit ? yarnData[yarnCount]?.type : ""}
          onChange={handleInputChange}
        ></StyledInput>
        <label htmlFor="color">color</label>
        <StyledInput
          name="color"
          type="text"
          radius="0.5rem"
          height="2rem"
          width="7rem"
          backgoundColor="#f5f5f5"
          defaultValue={isEdit ? yarnData[yarnCount]?.color : ""}
          onChange={handleInputChange}
        ></StyledInput>
        <label htmlFor="gramm">Gramm</label>
        <StyledInput
          name="gramm"
          type="text"
          radius="0.5rem"
          height="2rem"
          width="7rem"
          backgoundColor="#f5f5f5"
          defaultValue={isEdit ? yarnData[yarnCount]?.gramm : ""}
          onChange={handleInputChange}
        ></StyledInput>
        <label htmlFor="meter">Meter</label>
        <StyledInput
          name="meter"
          type="text"
          radius="0.5rem"
          height="2rem"
          width="7rem"
          backgoundColor="#f5f5f5"
          defaultValue={isEdit ? yarnData[yarnCount]?.meter : ""}
          onChange={handleInputChange}
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
