import styled from "styled-components";
export default function Categories({ handleClick, selectedProjectStatus }) {
  return (
    <>
      <CategoriyContainer>
        <CategoryCard
          className="planned"
          selectedProjectStatus={selectedProjectStatus}
          onClick={(e) => handleClick(e)}
        >
          Planned
        </CategoryCard>
        <CategoryCard
          className="active"
          selectedProjectStatus={selectedProjectStatus}
          onClick={(e) => handleClick(e)}
        >
          Active
        </CategoryCard>
        <CategoryCard
          className="completed"
          selectedProjectStatus={selectedProjectStatus}
          onClick={(e) => handleClick(e)}
        >
          Completed
        </CategoryCard>
        <CategoryCard
          className="hibernated"
          selectedProjectStatus={selectedProjectStatus}
          onClick={(e) => handleClick(e)}
        >
          Hibernated
        </CategoryCard>
      </CategoriyContainer>
    </>
  );
}

const CategoriyContainer = styled.div`
  position: absolute;
  top: 6rem;
  display: flex;
  justify-content: center;
`;
const CategoryCard = styled.span`
  height: 3rem;
  padding: 0 0.5rem;
  border: 0.1rem solid #f5f5f5;
  line-height: 3rem;
  background-color: ${({ className, selectedProjectStatus }) =>
    className.includes(selectedProjectStatus) ? "#999999" : "f5f5f5"};
`;
