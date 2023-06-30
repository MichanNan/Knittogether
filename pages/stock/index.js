import YarnStockList from "../../components/Stock/YarnStockList";
import Navigation from "../../components/Common/Navigation";
import Heading from "../../components/Common/Heading";
import YarnStockForm from "../../components/Stock/YarnStockForm";
import StockCategories from "../../components/Stock/StockCategories";
import NeedleStockList from "../../components/Stock/NeedleStockList";
import NeedleStockForm from "../../components/Stock/NeedleStockForm";

import { AddItemButton, Main } from "../../styles";
import { useState } from "react";
export default function YarnsStockPage() {
  const [stockContent, setStockContent] = useState("Yarn Stock");
  const [addYarnStockStatus, setAddYarnStockStatus] = useState(false);
  const [isYarnEdit, setIsYarnEdit] = useState(false);

  const [addNeedleStockStatus, setAddNeedleStockStatus] = useState(false);

  function handleAddYarnStock() {
    setAddYarnStockStatus(!addYarnStockStatus);
  }

  function handleAddNeedleStock() {
    setAddNeedleStockStatus(!addNeedleStockStatus);
  }
  return (
    <Main>
      <Heading>My Stocks</Heading>
      {!addYarnStockStatus && stockContent === "Yarn Stock" && (
        <>
          <StockCategories
            stockContent={stockContent}
            setStockContent={setStockContent}
          />
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

      {addYarnStockStatus && stockContent === "Yarn Stock" && (
        <YarnStockForm setAddYarnStockStatus={setAddYarnStockStatus} />
      )}

      {!addNeedleStockStatus && stockContent === "Needle Stock" && (
        <>
          <StockCategories
            stockContent={stockContent}
            setStockContent={setStockContent}
          />
          <NeedleStockList /> <Navigation />
          <AddItemButton onClick={handleAddNeedleStock}>+</AddItemButton>
        </>
      )}
      {addNeedleStockStatus && (
        <NeedleStockForm setAddNeedleStockStatus={setAddNeedleStockStatus} />
      )}
    </Main>
  );
}
