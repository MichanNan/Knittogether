import YarnStockList from "../../components/YarnStockList";
import Navigation from "../../components/Navigation";
import Heading from "../../components/Heading";
import AddButton from "../../components/AddButton";
import { Main } from "../../styles";
import { useState } from "react";
import YarnStockForm from "../../components/YarnStockForm";

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
