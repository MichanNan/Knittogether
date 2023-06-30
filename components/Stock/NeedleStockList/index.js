import useSWR from "swr";
import NeedleStockItem from "../NeedleStockItem";
import styled from "styled-components";

export default function NeedleStockList() {
  const { data: needles } = useSWR("/api/needle");
  if (!needles) {
    return;
  }

  return (
    <Wrapper>
      <div>
        {needles.map((needle) => (
          <div key={needle._id}>
            <NeedleStockItem needle={needle} />
          </div>
        ))}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 6rem;
`;
