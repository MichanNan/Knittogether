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
  backgroundColor,
  placeholderColor,
  placeholder,
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
      backgroundColor={backgroundColor}
      placeholderColor={placeholderColor}
      placeholder={placeholder}
    ></InputItem>
  );
}
const InputItem = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ radius }) => radius};
  border: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-size: 1rem;
  &:focus {
    outline: none;
  }
  text-indent: 1rem;
  ::placeholder {
    color: ${({ placeholderColor }) => placeholderColor};
  }
`;
