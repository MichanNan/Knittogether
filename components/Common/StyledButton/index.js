import styled from "styled-components";

export default function StyledButton({
  width,
  height,
  children,
  onClick,
  className,
  fontSize,
}) {
  return (
    <ButtonItem
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      fontSize={fontSize}
    >
      {children}
    </ButtonItem>
  );
}

const ButtonItem = styled.button`
  width: ${({ width }) => width};
  height: ${(height) => height};
  border: none;
  border-radius: 0.6rem;
  box-shadow: 0.1rem 0.1rem 0.5 #cccccc;
  background-color: var(--color-orange);
  color: var(--color-white);
  font-size: ${({ fontSize }) => fontSize};
`;
