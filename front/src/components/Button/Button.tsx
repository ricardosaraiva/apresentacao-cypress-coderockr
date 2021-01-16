import { FC } from 'react';

import { Container } from './styles';
import { ButtonVariant, Props } from './types';

const Button: FC<Props> = ({
  children,
  id,
  variant = ButtonVariant.primary,
  onClick,
}) => (
  <Container
    id={id}
    variant={variant}
    onClick={onClick}
  >
    { children }
  </Container>
);

export default Button;
