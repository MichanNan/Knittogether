import styled from "styled-components";

export default function AddButton({ handleClick }) {
  return <AddProjectButton onClick={handleClick}>+</AddProjectButton>;
}

const AddProjectButton = styled.button`
  position: fixed;
  bottom: 5rem;
  right: 3rem;
  z-index: 99;
  font-size: 3rem;
  line-height: 3rem;
  border-radius: 3rem;
  border: 1px solid transparent;
  width: 3rem;
  height: 3rem;
  font-weight: 700;
  text-align: center;
  color: #fff;
  background-color: #e07008;
  box-shadow: 0.1rem 0.1rem 0.5rem #ad5707;
`;
