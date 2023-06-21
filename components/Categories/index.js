import styled from "styled-components";

export default function Categories({ handleClick }) {
  return (
    <>
      <CategoriyContainer>
        <CategoryCard className="planned" onClick={(e) => handleClick(e)}>
          Planned
        </CategoryCard>
        <CategoryCard className="active" onClick={(e) => handleClick(e)}>
          Active
        </CategoryCard>
        <CategoryCard className="completed" onClick={(e) => handleClick(e)}>
          Completed
        </CategoryCard>
        <CategoryCard className="hibernating" onClick={(e) => handleClick(e)}>
          Hibernating
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
  background-color: #f5f5f5;
`;
