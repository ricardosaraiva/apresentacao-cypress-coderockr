import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ContainerPanel = styled.div`
  width: 350px;

  .panel {
    height: 400px;
    transition: height .2s ease-in-out;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .logo path {
    fill: ${({ theme }) => theme.palette.orange._500.toString()};
  }
`;

export const UserData = styled.ul`
  text-align: left;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 20px;
`;

export const UserRow = styled.li`
  margin-bottom: 10px;
  padding-bottom: 3px;
  border-bottom: dashed 1px ${({ theme }) => theme.palette.orange._500.alpha(0.4).toString()};
`;

export const UserLabel = styled.b`
  display: block;
  text-transform: uppercase;
`;
