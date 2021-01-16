import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    position: relative;
    z-index: 1;
    color: ${({ theme }) => theme.palette.orange._500.toString()};
    background: ${({ theme }) => theme.palette.white.toString()};
    padding: 30px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;
