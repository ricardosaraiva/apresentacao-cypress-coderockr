import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  body, *, input, textarea, select, button {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: 'Roboto', sans-serif !important;
    outline: none !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-image: linear-gradient(
      to bottom right,
      ${({ theme }) => theme.palette.orange._500.toString()},
      ${({ theme }) => theme.palette.orange._400.toString()}
    );
    width: 100%;
    height: 100vh;
    color: ${({ theme }) => theme.palette.white.toString()};
  }
`;
