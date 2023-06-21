import styled from "styled-components";
import { useState } from "react";

export default function StyledInput({
  width,
  height,
  radius,
  name,
  type,
  maxLength,
  required,
}) {
  const [inputName, setInputName] = useState("");
  return (
    <InputItem
      width={width}
      height={height}
      radius={radius}
      name={name}
      type={type}
      onChange={(e) => setInputName(e.target.value)}
      value={inputName}
      maxLength={maxLength}
      required={required}
    ></InputItem>
  );
}
const InputItem = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ radius }) => radius};
  border: none;
  background-color: #f5f5f5;
  box-shadow: 0.1rem 0.1rem 0.4rem #cccccc;
  font-size: 1.5rem;
`;
