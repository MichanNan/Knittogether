import useSWR from "swr";
import NeedleStockItem from "../NeedleStockItem";
import NeedleStockForm from "../NeedleStockForm";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import ConfirmDelete from "../../Common/ConfirmDelete";

export default function NeedleStockList({ isNeedleEdit, setIsNeedleEdit }) {
  const [needleId, setNeedleId] = useState("");
  const [deleteNeedleStockStatus, setDeleteNeedleStockStatus] = useState(false);

  const { data: needleList, mutate, isLoading } = useSWR("/api/needle");
  if (!needleList) {
    return;
  }
  if (isLoading) {
    <p>Loading...</p>;
  }

  function handleNeedleEditStatus(id) {
    setIsNeedleEdit(true);
    setNeedleId(id);
  }

  const editedNeedleStock = needleList.find(
    (needle) => needle._id === needleId
  );

  function handleChangeDeleteExistedNeedleStatus(id) {
    setDeleteNeedleStockStatus(true);
    setNeedleId(id);
  }
  async function handleDeleteExistedNeedle(id) {
    const response = await fetch(`/api/needle?id=${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    mutate();
    setIsNeedleEdit(false);
    setDeleteNeedleStockStatus(false);
  }
  return (
    <>
      {isNeedleEdit ? (
        <NeedleStockForm
          isNeedleEdit={isNeedleEdit}
          setIsNeedleEdit={setIsNeedleEdit}
          editedNeedleStock={editedNeedleStock}
        />
      ) : (
        <NeedleListContainer>
          {needleList.map((needle) => (
            <NeedleItemContainer key={needle._id}>
              <NeedleStockItem needle={needle} />
              <ButtonContainer>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => handleNeedleEditStatus(needle._id)}
                />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() =>
                    handleChangeDeleteExistedNeedleStatus(needle._id)
                  }
                />
              </ButtonContainer>
              {deleteNeedleStockStatus && (
                <ConfirmDelete
                  needleId={needleId}
                  deleteNeedleStockStatus={true}
                  handleDeleteExistedNeedle={() =>
                    handleDeleteExistedNeedle(needleId)
                  }
                  cancelDeleteNeedleStock={() =>
                    setDeleteNeedleStockStatus(false)
                  }
                />
              )}
            </NeedleItemContainer>
          ))}
        </NeedleListContainer>
      )}
    </>
  );
}
const NeedleListContainer = styled.div`
  margin-top: 3rem;
  margin-bottom: 6rem;
  display: flex;
  flex-direction: column;
`;
const NeedleItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: translateX(1rem);
`;
