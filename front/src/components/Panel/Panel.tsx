import { FC } from 'react';
import {
  Container,
} from './styles';

const Panel: FC<{}> = ({ children }) => (
  <Container className="panel">
    { children }
  </Container>
);

export default Panel;
