import { Route } from 'react-router-dom';
import { Server } from 'miragejs';
import {
  render,
  fireEvent,
  waitFor,
  makeServer,
  history,
} from '../../utils/test-utils';

import Home from './Home';

describe('Home', () => {
  let server: Server;

  const loginUser = async (data: object = {}) => {
    await localStorage.setItem('user', JSON.stringify({
      _id: 1,
      name: 'new user',
      email: 'new@user.com',
      ...data,
    }));
  };

  const createUser = async () => {
    const user = {
      _id: 1,
      name: 'new user',
      email: 'new@user.com',
      password: '123456',
    };

    await server.schema.create('users', user);
    await loginUser(user);
  };

  beforeEach(() => {
    server = makeServer();
    window.localStorage.removeItem('user');
  });

  afterEach(() => {
    server?.shutdown();
  });

  test('Deve redirecionar para a tela de login caso não tenha dados do usuário gravado no localstorage', async () => {
    jest.spyOn(history, 'push');
    render(<Route component={Home} path="*" exact />);
    await waitFor(() => {
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith('/login');
    });
  });

  test('Deve redirecionar para a tela de login caso o usuário não for encontrado', async () => {
    jest.spyOn(history, 'push');
    await loginUser();
    render(<Route component={Home} path="*" exact />);

    await waitFor(() => {
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith('/login');
    });
  });

  test('Deve exibir os dados do usuário caso esteja logado', async () => {
    jest.spyOn(history, 'push');
    await createUser();
    const { container } = render(<Route component={Home} path="*" exact />);

    await waitFor(() => {
      const elData = container.querySelectorAll('ul li');
      expect(elData[0].textContent).toContain('new user');
      expect(elData[1].textContent).toContain('new@user.com');
    });
  });

  test('Deve redicionar para a tela de login quando clicar no botão sair', async () => {
    jest.spyOn(history, 'push');
    await createUser();
    const { container } = render(<Route component={Home} path="*" exact />);
    const button = container.querySelector('button') as Element;
    await fireEvent.click(button);

    await waitFor(() => {
      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith('/login');
    });
  });
});
