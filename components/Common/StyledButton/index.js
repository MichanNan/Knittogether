import styled from "styled-components";

export default function StyledButton({
  width,
  height,
  children,
  onClick,
  className,
}) {
  return (
    <ButtonItem
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    >
      {children}
    </ButtonItem>
  );
}

const ButtonItem = styled.button`
  width: ${({ width }) => width};
  height: ${(height) => height};
  border: none;
  border-radius: 1rem;
  box-shadow: 0.1rem 0.1rem 0.5 #cccccc;
  background-color: var(--color-orange);
  color: var(--color-white);
  font-size: 1.2rem;
`;
