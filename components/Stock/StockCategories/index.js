import styled from "styled-components";

export default function StockCategories({ stockContent, setStockContent }) {
  function handleClick(event) {
    setStockContent(event.target.innerText);
  }
  return (
    <Wrapper>
      <Item
        onClick={(event) => handleClick(event)}
        className="yarn"
        stockContent={stockContent}
      >
        Yarn Stock
      </Item>
      <Item
        onClick={(event) => handleClick(event)}
        className="needle"
        stockContent={stockContent}
      >
        Needle Stock
      </Item>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  gap: 1rem;
  border-top: solid 0.1rem #e07008;
  border-bottom: solid 0.1rem #e07008;
  height: 3rem;
  align-items: center;
`;
const Item = styled.div`
  height: 3rem;
  padding: 0 0.5rem;
  border: none;
  line-height: 3rem;
  border-top: solid 0.1rem #e07008;
  border-bottom: solid 0.1rem #e07008;
  background-color: ${({ stockContent, className }) =>
    stockContent && stockContent.toLowerCase().includes(className)
      ? "#e07008"
      : "#fff"};
  color: ${({ stockContent, className }) =>
    stockContent && stockContent.toLowerCase().includes(className)
      ? "#ffffff"
      : "#000"};
`;
