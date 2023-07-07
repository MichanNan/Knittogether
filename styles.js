import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import Link from "next/link";

export default createGlobalStyle`
:root{ 
    --color-white: #ffffff;
    --color-orange: #e07008;
    --color-grey:#f5f5f5;
    --color-black:#000000;
    --color-shadow:#ad5707
  
  }
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
  padding-bottom: 3rem;
`;

export const AddItemButton = styled.button`
  position: fixed;
  bottom: 5rem;
  right: 3rem;
  z-index: 99;
  font-size: ${({ fontSize }) => fontSize};
  line-height: 1rem;
  border-radius: 3rem;
  border: 1px solid transparent;
  width: 3rem;
  height: 3rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-white);
  background-color: var(--color-orange);
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
  color: var(--color-white);
  background-color: var(--color-orange);
  box-shadow: 0.1rem 0.1rem 0.3rem #ad5707;
`;
export const ImageWrapper = styled.div`
  border-radius: ${({ radius }) => radius};
  overflow: hidden;
`;
export const HeavyFont = styled.span`
  font-weight: 700;
`;
export const ColoredFont = styled.span`
  color: var(--color-orange);
`;
export const LightFont = styled.p`
  font-weight: 300;
`;
export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  float: right;
  width: 100%;
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
export const SubTitle = styled.span`
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  align-self: start;
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
export const AuthForm = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
export const AuthInfoContainer = styled.div`
  margin-top: 4rem;
`;
export const AuthInfo = styled.p`
  margin-top: 1rem;
  margin-left: ${({ left }) => left};
  font-size: ${({ fontSize }) => fontSize};
  text-align: center;
`;
export const AuthLabel = styled.label`
  align-self: start;
`;
export const AuthLink = styled(StyledLink)`
  transform: translateX(1rem);
  font-size: 0.8rem;
`;
