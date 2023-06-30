import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Link from "next/link";

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

export const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  top: 2rem;
  padding-bottom: 1rem;
`;

export const AddItemButton = styled.button`
  position: fixed;
  bottom: 5rem;
  right: 3rem;
  z-index: 99;
  font-size: 3rem;
  line-height: 3rem;
  border-radius: 3rem;
  border: 1px solid transparent;
  width: 3rem;
  height: 3rem;
  font-weight: 700;
  text-align: center;
  color: #fff;
  background-color: #e07008;
  box-shadow: 0.1rem 0.1rem 0.5rem #ad5707;
`;

export const ToggleButton = styled.div`
  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  font-size: 1.5rem;
  line-height: 1.3rem;
  border-radius: 1.5rem;
  border: 1px solid transparent;
  width: 1.5rem;
  height: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #fff;
  background-color: #e07008;
  box-shadow: 0.1rem 0.1rem 0.3rem #ad5707;
`;
export const ImageWrapper = styled.div`
  border-radius: 2rem;
  overflow: hidden;
`;
export const HeavyFont = styled.p`
  font-weight: 700;
`;
export const ColoredFont = styled.p`
  color: #e07008;
`;
export const LightFont = styled.p`
  font-weight: 300;
`;
export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  float: right;
  width: 500px;
  height: 100%;
  background-color: #cccccc;
  opacity: 0.6;
  z-index: 99;
`;
export const ButtonContainer = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  gap: 1rem;
`;
export const SubTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 1rem auto;
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
