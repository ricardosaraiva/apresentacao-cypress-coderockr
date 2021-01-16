import styled from 'styled-components';

export const Container = styled.div`
    text-align: left;
    margin: 10px 0;
`;

export const Label = styled.label`
    color: ${({ theme }) => theme.palette.orange._500.toString()};
    font-weight: 700;
    margin-bottom: 5px;
    display: block;
`;

export const Input = styled.input`
    width: 100%;
    padding: 15px 20px;
    font-size: 16px;
    font-weight: 400;
    height: 49px;
    border-radius: 0;
    border: solid 1px ${({ theme }) => theme.palette.orange._400.toString()};
    background: ${({ theme }) => theme.palette.orange._400.toString()};
    color: ${({ theme }) => theme.palette.orange._700.toString()};
`;
