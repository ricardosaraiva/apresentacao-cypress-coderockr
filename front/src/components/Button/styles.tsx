import styled, { DefaultTheme } from 'styled-components';
import { ButtonVariant } from './types';

const buttonColor = (theme: DefaultTheme, variant: ButtonVariant): string => {
  const style = {
    [ButtonVariant.primary]: `
      background: ${theme.palette.orange._500};
      color: ${theme.palette.white};
    `,
    [ButtonVariant.success]: `
      background: ${theme.palette.green._500};
      color: ${theme.palette.white};
    `,
    [ButtonVariant.danger]: `
      background: ${theme.palette.red._500};
      color: ${theme.palette.white};
    `,
  };

  return style[variant];
};

export const Container = styled.button<{ variant: ButtonVariant }>`
    width: 100%;
    padding: 15px 20px;
    margin: 20px 0;
    text-align: center;
    ${({ variant, theme }) => buttonColor(theme, variant)};
    font-size: 16px;
    font-weight: 400;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
`;
