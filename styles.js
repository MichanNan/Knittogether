import { createGlobalStyle } from "styled-components";

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
