import { FC } from 'react';

import {
  Container,
  Input as InputComponent,
  Label,
} from './styles';
import { Props } from './types';

const Input: FC<Props> = ({
  onChange,
  label,
  id,
  type,
}) => (
  <Container>
    <Label htmlFor={id}>{label}</Label>
    <InputComponent
      id={id}
      onChange={onChange}
      type={type}
    />
  </Container>
);

export default Input;
