import styled from "styled-components";
export default function Categories({ handleClick, selectedProjectStatus }) {
  return (
    <>
      <CategoriyContainer>
        <CategoryCard
          className="planned"
          selectedProjectStatus={selectedProjectStatus}
          onClick={(event) => handleClick(event)}
        >
          Planned
        </CategoryCard>
        <CategoryCard
          className="active"
          selectedProjectStatus={selectedProjectStatus}
          onClick={(event) => handleClick(event)}
        >
          Active
        </CategoryCard>
        <CategoryCard
          className="completed"
          selectedProjectStatus={selectedProjectStatus}
          onClick={(event) => handleClick(event)}
        >
          Completed
        </CategoryCard>
        <CategoryCard
          className="hibernated"
          selectedProjectStatus={selectedProjectStatus}
          onClick={(event) => handleClick(event)}
        >
          Hibernated
        </CategoryCard>
      </CategoriyContainer>
    </>
  );
}

const CategoriyContainer = styled.div`
  position: absolute;
  top: 5rem;
  display: flex;
  justify-content: center;
  border-bottom: 0.1rem solid #e07008;
  border-top: 0.1rem solid #e07008;
`;
const CategoryCard = styled.span`
  height: 3rem;
  padding: 0 0.5rem;
  border: none;
  line-height: 3rem;
  background-color: ${({ className, selectedProjectStatus }) =>
    selectedProjectStatus && className.includes(selectedProjectStatus)
      ? "#e07008"
      : "#fff"};
  color: ${({ className, selectedProjectStatus }) =>
    selectedProjectStatus && className.includes(selectedProjectStatus)
      ? "#ffffff"
      : "#000"};
`;
