import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'CirceRounded';
    src: url('/ai-school-kid/fonts/CirceRounded-Regular.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'CirceRounded';
    src: url('/ai-school-kid/fonts/CirceRounded-Bold.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
  }

  * {
    font-family: 'CirceRounded', sans-serif;  
    box-sizing: border-box;
    outline: none;
    margin: 0;
  }

  body {
    margin: 120px 0;
    padding: 0;
    background-color: #E1F8E9;
    color: ${({ theme }) => theme.colors.default};
  }

  h2 {
    font-size: 20px;
    margin-bottom: 24px;
    color: #000000;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
