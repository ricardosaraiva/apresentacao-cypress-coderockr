import { fireEvent, render } from '../../utils/test-utils';

import theme from '../../utils/theme';

import Button from './Button';
import { ButtonVariant } from './types';


describe('Componente Button', () => {
    test('Deve ter o texto "Button x"', () => {
        const { container, getByText } = render(<Button>Button x</Button>);
        expect(getByText('Button x')).toBeInTheDocument();
    });

    test('Deve alterar a variavel toggle ao clicar no botão', () => {
        let toggle = false;
        const { container } = render(
            <Button onClick={() => toggle = true}>Button x</Button>
        );
        const el = container.querySelector('button') as Element;
        fireEvent.click(el);
        expect(toggle).toBeTruthy();
    });

    test('Deve ter o background com a cor orange._500 se a variant for primary', async () => {
        const { container } = render(<Button variant={ButtonVariant.primary}>Button x</Button>);
        const button = container.querySelector('button') as Element;
        expect(window.getComputedStyle(button).background)
            .toEqual(theme.palette.orange._500.rgb().toString());
    });

    test('Deve ter o background com a cor red._500 se a variant for danger', async () => {
        const { container } = render(<Button variant={ButtonVariant.danger}>Button x</Button>);
        const button = container.querySelector('button') as Element;
        expect(window.getComputedStyle(button).background)
            .toEqual(theme.palette.red._500.rgb().toString());
    });

    test('Deve ter o background com a cor green._500 se a variant for success', async () => {
        const { container } = render(<Button variant={ButtonVariant.success}>Button x</Button>);
        const button = container.querySelector('button') as Element;
        expect(window.getComputedStyle(button).background)
            .toEqual(theme.palette.green._500.rgb().toString());
    });
});
