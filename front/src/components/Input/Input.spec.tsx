import { ChangeEvent } from 'react';
import { render, fireEvent } from '../../utils/test-utils';

import Input from './Input';

describe('Componente Input', () => {
    test('Deve ter um label com o valor "Nome"', () => {
        const { container, getByText } = render(<Input id="id" label="Nome" />);
        expect(getByText('Nome')).toBeInTheDocument(); // valida no documento todo
        expect(container.querySelector('label')?.textContent).toEqual('Nome'); // direto no elemento
    });

    test('Deve chamar a função onChange e atualizar a variavel label para "novo valor"', async () => {
        let value = '';
        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            value = e.target.value;
        };
        const { container } = render(<Input id="id" label="Nome" onChange={onChange} />);
        const input = container.querySelector('input') as Element;
        fireEvent.change(input, { target: { value: 'novo valor' } });
        expect(value).toEqual('novo valor');
    });

    test('Deve setar o atributo htmlFor do label com o valo name e o id do input com valor name', () => {
        const { container } = render(<Input id="name" label="Nome" />);

        const input = container.querySelector('input');
        const label = container.querySelector('label');

        expect(input?.getAttribute('id')).toEqual('name');
        expect(input?.getAttribute('id')).toEqual(label?.getAttribute('for'));
    });
})
