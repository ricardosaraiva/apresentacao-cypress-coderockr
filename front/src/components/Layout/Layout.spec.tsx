import { renderWihtoutTheme } from '../../utils/test-utils';

import Layout from './Layout';

describe('Componente Layout', () => {
    test('Valida se o componente layout esta renderizando', () => {
        const { container } = renderWihtoutTheme(<Layout>layouts</Layout>);

        const el = container.querySelector('div') as Element;

        expect(window.getComputedStyle(el)).toMatchSnapshot();
        expect(container).toMatchSnapshot();
    });
})
