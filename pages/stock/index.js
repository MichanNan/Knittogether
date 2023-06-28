import YarnStockList from "../../components/Stock/YarnStockList";
import Navigation from "../../components/Common/Navigation";
import Heading from "../../components/Common/Heading";
import AddButton from "../../components/Common/AddButton";
import { Main } from "../../styles";
import { useState } from "react";
import YarnStockForm from "../../components/Stock/YarnStockForm";

export default function YarnsStockPage() {
  const [addYarnStockStatus, setAddYarnStockStatus] = useState(false);
  function handleAddYarnStock() {
    setAddYarnStockStatus(!addYarnStockStatus);
  }
  return (
    <Main>
      <Heading>Yarn Stocks</Heading>
      {!addYarnStockStatus && (
        <>
          <YarnStockList />
          <Navigation />
          <AddButton handleClick={handleAddYarnStock} />
        </>
      )}
      {addYarnStockStatus && (
        <YarnStockForm setAddYarnStockStatus={setAddYarnStockStatus} />
      )}
    </Main>
  );
}