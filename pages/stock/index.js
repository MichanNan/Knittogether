import YarnStockList from "../../components/Stock/YarnStockList";
import Navigation from "../../components/Common/Navigation";
import Heading from "../../components/Common/Heading";
import YarnStockForm from "../../components/Stock/YarnStockForm";
import { AddItemButton, Main } from "../../styles";
import { useState } from "react";
import StockCategories from "../../components/Stock/StockCategories";
import NeedleStockList from "../../components/Stock/NeedleStockList";

export default function YarnsStockPage() {
  const [stockContent, setStockContent] = useState("Yarn Stock");
  const [addYarnStockStatus, setAddYarnStockStatus] = useState(false);
  const [isYarnEdit, setIsYarnEdit] = useState(false);
  function handleAddYarnStock() {
    setAddYarnStockStatus(!addYarnStockStatus);
  }
  return (
    <Main>
      <StockCategories
        stockContent={stockContent}
        setStockContent={setStockContent}
      />
      <Heading>My Stocks</Heading>
      {!addYarnStockStatus && stockContent === "Yarn Stock" && (
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
      {addYarnStockStatus && stockContent === "Yarn Stock" && (
        <YarnStockForm setAddYarnStockStatus={setAddYarnStockStatus} />
      )}
      {stockContent === "Needle Stock" && <NeedleStockList />}
    </Main>
  );
}
