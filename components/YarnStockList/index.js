import useSWR from "swr";
import YarnStockItem from "../YarnStockItem";
import styled from "styled-components";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function YarnStockList() {
  const { data: yarnList, mutate } = useSWR("/api/yarn", fetcher);
  if (!yarnList) {
    return;
  }

  return (
    <YarnListContainer>
      {yarnList.map((yarn) => (
        <div key={yarn._id}>
          <YarnStockItem yarn={yarn} />
        </div>
      ))}
    </YarnListContainer>
  );
}

const YarnListContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
