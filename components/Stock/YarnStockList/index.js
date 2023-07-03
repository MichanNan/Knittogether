import useSWR from "swr";
import YarnStockItem from "../YarnStockItem";
import ConfirmDelete from "../../Common/ConfirmDelete";
import YarnStockForm from "../YarnStockForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function YarnStockList({ isYarnEdit, setIsYarnEdit }) {
  const [yarnId, setYarnId] = useState("");
  const [deleteYarnStockStatus, setDeleteYarnStockStatus] = useState(false);

  const { data: yarnList, mutate, isLoading } = useSWR("/api/yarn", fetcher);

  if (!yarnList) {
    return;
  }
  if (isLoading) {
    <p>Loading...</p>;
  }
  function handleEditYarnStock(id) {
    setIsYarnEdit(true);
    setYarnId(id);
  }
  function handleChangeDeleteYarnStockStatus(id) {
    setDeleteYarnStockStatus(true);
    setYarnId(id);
  }
  function cancelDeleteYarnStock() {
    setDeleteYarnStockStatus(false);
  }

  const editedYarnStock = yarnList.find((yarn) => yarn._id === yarnId);

  async function handleDeleteExistedYarn(id) {
    const response = await fetch(`/api/yarn?id=${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    mutate();
    setIsYarnEdit(false);
    setDeleteYarnStockStatus(false);
  }
  return (
    <>
      {isYarnEdit ? (
        <YarnStockForm
          isYarnEdit={isYarnEdit}
          setIsYarnEdit={setIsYarnEdit}
          editedYarnStock={editedYarnStock}
        />
      ) : (
        <YarnListContainer>
          {yarnList.map((yarn) => (
            <div key={yarn._id}>
              <YarnItemContainer key={yarn._id}>
                <YarnStockItem yarn={yarn} />
                <ButtonContainer>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={() => handleEditYarnStock(yarn._id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={() => handleChangeDeleteYarnStockStatus(yarn._id)}
                  />
                </ButtonContainer>
                {deleteYarnStockStatus && (
                  <ConfirmDelete
                    yarnId={yarnId}
                    deleteYarnStockStatus={true}
                    handleDeleteExistedYarn={handleDeleteExistedYarn}
                    cancelDeleteYarnStock={cancelDeleteYarnStock}
                  />
                )}
              </YarnItemContainer>
            </div>
          ))}
        </YarnListContainer>
      )}
    </>
  );
}

const YarnListContainer = styled.div`
  margin-top: 3rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  padding-bottom: 3rem;
`;
const YarnItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonContainer = styled.div`
  transform: translateX(-2rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
