import Image from "next/image";
import styled from "styled-components";
import { HeavyFont, ImageWrapper } from "../../styles";

export default function YarnStockItem({ yarn }) {
  return (
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
    </YarnItemContainer>
  );
}
const YarnItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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
`;
