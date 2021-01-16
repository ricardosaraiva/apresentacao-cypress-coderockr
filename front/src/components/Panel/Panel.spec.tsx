import { render } from '../../utils/test-utils';

import Panel from './Panel';

describe('Componente Panel', () => {
    test('Valida se o componente panel esta renderizando', () => {
        const { container } = render(<Panel>panel</Panel>);

        const el = container.querySelector('.panel') as Element;

        expect(window.getComputedStyle(el)).toMatchSnapshot();
        expect(container).toMatchSnapshot();
    });
})
