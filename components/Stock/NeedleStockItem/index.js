import styled from "styled-components";

export default function NeedleStockItem({ needle }) {
  return (
    <NeedleItemContainer>
      <span>Size(mm)</span>
      <p>{needle.size}</p>
      <span>Length(cm)</span>
      <p>{needle.length}</p>
      <span>Amount</span>
      <p>{needle.amount}</p>
    </NeedleItemContainer>
  );
}
const NeedleItemContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  row-gap: 1rem;
  column-gap: 0.5rem;
  width: 100%;

  border-bottom: solid 0.1rem var(--color-orange);
`;
