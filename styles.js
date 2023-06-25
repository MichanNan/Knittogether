import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding:0;
    list-style:none
  }
  body {
   
    font-family: system-ui;
    
  }
`;

export const RowSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;
export const ColumnSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
`;
export const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  margin: 0 auto;
  top: 2rem;
  padding-bottom: 1rem;
`;

export const ColoredFont = styled.p`
  color: #e07008;
`;
export const ImageWrapper = styled.div`
  border-radius: 2rem;
  overflow: hidden;
`;
export const HeavyFont = styled.p`
  font-weight: 700;
`;
export const LightFont = styled.p`
  font-weight: 300;
`;
export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  float: right;
  width: 375px;
  height: 100%;
  background-color: #cccccc;
  opacity: 0.4;
  z-index: 99;
`;
export const ButtonContainer = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-evenly;
`;
