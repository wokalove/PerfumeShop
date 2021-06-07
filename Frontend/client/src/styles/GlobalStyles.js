import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  html {
    font-family: 'Montserrat', sans-serif;
    font-size: 100%;
  }
`;

export default GlobalStyle;
