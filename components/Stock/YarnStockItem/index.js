import Image from "next/image";
import styled from "styled-components";
import { HeavyFont, ImageWrapper, ToggleButton } from "../../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import YarnStockForm from "../YarnStockForm";
import { useState } from "react";

export default function YarnStockItem({ yarn }) {
  const [isEdit, setIsEdit] = useState(false);

  function handleEditYarnStock() {
    setIsEdit(true);
  }
  return (
    <>
      {/* {isEdit ? (
        <YarnStockForm />
      ) : ( */}
      <YarnItemContainer>
        <ImageWrapper>
          <Image
            src={yarn.image}
            alt={yarn.brand}
            width={100}
            height={100}
            style={{ width: "100", height: "auto" }}
          ></Image>
        </ImageWrapper>

        <YarnInformationSection>
          <HeavyFont>Brand: </HeavyFont>
          <p>{yarn.brand}</p>

          <HeavyFont>Type: </HeavyFont>
          <p>{yarn.type}</p>

          <HeavyFont>Color: </HeavyFont>
          <p>{yarn.color}</p>

          <HeavyFont>Skein: </HeavyFont>
          <p>{yarn.skein}</p>

          <HeavyFont>meter: </HeavyFont>
          <p>{yarn.meter}</p>

          <HeavyFont>gramm: </HeavyFont>
          <p>{yarn.gramm}</p>
        </YarnInformationSection>
        {/* <ButtonContainer>
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={handleEditYarnStock}
            />
            <FontAwesomeIcon icon={faTrashCan} />
          </ButtonContainer> */}
      </YarnItemContainer>
      {/* )} */}
    </>
  );
}
const YarnItemContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  transform: translateX(-1.5rem);
  padding-right: 1rem;
`;
const YarnInformationSection = styled.section`
  transform: translateY(-0.6rem);
  margin-left: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 30% 25%);
  grid-template-rows: repeat(3, 33.33%);
  grid-gap: 0.5rem 0.8rem;
  font-size: 1rem;
  font-weight: 300;
  width: 40%;
`;

// const ButtonContainer = styled.div`
//   transform: translateX(3.5rem);
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;
