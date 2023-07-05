import styled from "styled-components";
import StyledInput from "../../Common/StyledInput";
export default function YarnItem({
  defaultYarn,
  isEdit,
  handleInputChange,
  children,
}) {
  return (
    <>
      <YarnWrapper>
        <label htmlFor="brand">Brand</label>
        <YarnItemInput
          name="brand"
          type="text"
          maxLength={10}
          defaultValue={isEdit ? defaultYarn.brand : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        />
        <label htmlFor="skein">Skein</label>
        <YarnItemInput
          name="skein"
          type="text"
          maxLength={5}
          defaultValue={isEdit ? defaultYarn?.skein : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        />
        <label htmlFor="type">Type</label>
        <YarnItemInput
          name="type"
          type="text"
          maxLength={10}
          defaultValue={isEdit ? defaultYarn.type : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        />
        <label htmlFor="color">color</label>
        <YarnItemInput
          name="color"
          type="text"
          maxLength={10}
          defaultValue={isEdit ? defaultYarn.color : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        />
        <label htmlFor="gramm">Gramm</label>
        <YarnItemInput
          name="gramm"
          type="text"
          maxLength={10}
          defaultValue={isEdit ? defaultYarn?.gramm : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        />
        <label htmlFor="meter">Meter</label>
        <YarnItemInput
          name="meter"
          type="text"
          maxLength={10}
          defaultValue={isEdit ? defaultYarn.meter : ""}
          onChange={(event) => handleInputChange(event, defaultYarn.id)}
        />
        {children}
      </YarnWrapper>
    </>
  );
}
const YarnWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 15% 35%);
  grid-template-rows: repeat(3, 33.33%);
  grid-gap: 0.5rem 0.5rem;
  z-index: 99;
  margin-top: 1rem;
  position: relative;
`;
const YarnItemInput = styled(({ name, defaultValue, onChange, maxLength }) => (
  <StyledInput
    radius="0.5rem"
    height="2rem"
    width="6rem"
    backgroundColor="var(--color-grey)"
    name={name}
    defaultValue={defaultValue}
    onChange={onChange}
    maxLength={maxLength}
  />
))``;
