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
  const [isNeedleEdit, setIsNeedleEdit] = useState(false);

  const [addNeedleStockStatus, setAddNeedleStockStatus] = useState(false);

  function handleAddYarnStock() {
    setAddYarnStockStatus(!addYarnStockStatus);
  }

  function handleAddNeedleStock() {
    setAddNeedleStockStatus(!addNeedleStockStatus);
  }
  return (
    <Main>
      <Heading>My Stock</Heading>
      {!addYarnStockStatus && stockContent === "Yarn Stock" && (
        <>
          {!isYarnEdit && (
            <StockCategories
              stockContent={stockContent}
              setStockContent={setStockContent}
            />
          )}
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
          {!isNeedleEdit && (
            <StockCategories
              stockContent={stockContent}
              setStockContent={setStockContent}
            />
          )}
          <NeedleStockList
            isNeedleEdit={isNeedleEdit}
            setIsNeedleEdit={setIsNeedleEdit}
          />
          <Navigation />
          {!isNeedleEdit && (
            <AddItemButton onClick={handleAddNeedleStock}>+</AddItemButton>
          )}
        </>
      )}
      {addNeedleStockStatus && (
        <NeedleStockForm setAddNeedleStockStatus={setAddNeedleStockStatus} />
      )}
    </Main>
  );
}
