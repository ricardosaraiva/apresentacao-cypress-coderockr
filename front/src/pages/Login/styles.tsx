import styled, { keyframes } from 'styled-components';

const logo = keyframes`
  0% {
    fill-opacity: 0;
    stroke-dasharray: 0 100;
    stroke-opacity: 1;
  }
  90% {
    stroke-dasharray: 100 0;
    stroke-opacity: 1;
    fill-opacity: 0;
  }
  100% {
    fill-opacity: 1;
    stroke-dasharray: 100 0;
    stroke-opacity: 0;
  }
`;

const form = keyframes`
  0% {
    opacity: 0;
  }
  80% {
    opacity: 0;
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ContainerPanel = styled.div<{sign: boolean}>`
  width: 350px;

  .panel {
    height: ${({ sign }) => (sign ? '450px' : '500px')};
    transition: height .2s ease-in-out;
    overflow: hidden;
  }

  .logo path {
    stroke-width: 1px;
    stroke-opacity: 0;
    stroke: ${({ theme }) => theme.palette.orange._500.toString()};
    fill: ${({ theme }) => theme.palette.orange._500.toString()};
    stroke-dashoffset: -1;
    animation: ${logo} 2s linear;
  }
`;

export const ContainerForm = styled.form<{show: boolean}>`
  animation: ${form} 2s linear;
  position: absolute;
  top: 120px;
  width: calc(100% - 60px);
  opacity: ${({ show }) => (show ? '1' : '0 !important')};
  pointer-events: ${({ show }) => (show ? 'all' : 'none')};
  z-index: ${({ show }) => (show ? '1' : '-1')};
  transition: opacity 1s ease-in-out;
`;

export const ContainerText = styled.div`
  color: ${({ theme }) => theme.palette.grey._700.toString()};
  font-size: 14px;

  a {
    margin-left: 10px;
    font-size: 14px;
    cursor: pointer;
    color: ${({ theme }) => theme.palette.orange._500.toString()};
    background: none;
    border: none;
  }
`;
