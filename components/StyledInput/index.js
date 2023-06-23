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
    ></InputItem>
  );
}
const InputItem = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ radius }) => radius};
  border: none;
  background-color: #f5f5f5;
  font-size: 1.5rem;
  &:focus {
    outline: none;
  }
  text-indent: 1rem;
`;
