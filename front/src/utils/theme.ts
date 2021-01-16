import 'styled-components';
import color from 'color';

const theme = {
  palette: {
    grey: {
      _50: color('#e3e7eb'),
      _100: color('#fafafa'),
      _700: color('#666'),
    },
    black: color('#000'),
    white: color('#FFF'),
    orange: {
      _400: color('#f7c974'),
      _500: color('#F2A91C'),
      _700: color('#af7303'),
    },
    green: {
      _500: color('#246224'),
    },
    red: {
      _500: color('#AA0601'),
    },
  },
};

type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export default theme;
