import styled from "styled-components";

export default function StyledInput({
  defaultValue,
  width,
  height,
  radius,
  name,
  type,
  maxLength,
  required,
  onChange,
  backgoundColor,
}) {
  return (
    <InputItem
      width={width}
      height={height}
      radius={radius}
      name={name}
      type={type}
      onChange={onChange}
      maxLength={maxLength}
      required={required}
      defaultValue={defaultValue}
      backgoundColor={backgoundColor}
    ></InputItem>
  );
}
const InputItem = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ radius }) => radius};
  border: none;
  background-color: ${({ backgoundColor }) => backgoundColor};
  font-size: 1rem;
  &:focus {
    outline: none;
  }
  text-indent: 1rem;
`;
