import YarnStockList from "../../components/Stock/YarnStockList";
import Navigation from "../../components/Common/Navigation";
import Heading from "../../components/Common/Heading";
import YarnStockForm from "../../components/Stock/YarnStockForm";
import { AddItemButton, Main } from "../../styles";
import { useState } from "react";

export default function YarnsStockPage() {
  const [addYarnStockStatus, setAddYarnStockStatus] = useState(false);
  const [isYarnEdit, setIsYarnEdit] = useState(false);
  function handleAddYarnStock() {
    setAddYarnStockStatus(!addYarnStockStatus);
  }
  return (
    <Main>
      <Heading>Yarn Stocks</Heading>
      {!addYarnStockStatus && (
        <>
          <YarnStockList
            isYarnEdit={isYarnEdit}
            setIsYarnEdit={setIsYarnEdit}
          />
          <Navigation />
          {!isYarnEdit && (
            <AddItemButton onClick={handleAddYarnStock}>+</AddItemButton>
          )}
        </>
      )}
      {addYarnStockStatus && (
        <YarnStockForm setAddYarnStockStatus={setAddYarnStockStatus} />
      )}
    </Main>
  );
}
