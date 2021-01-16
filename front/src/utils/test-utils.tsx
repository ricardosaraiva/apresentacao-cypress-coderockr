import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { createMemoryHistory } from 'history';
import { Model, Registry, Response, Server } from 'miragejs';

import theme from './theme';
import Schema from 'miragejs/orm/schema';
import { ModelDefinition } from 'miragejs/-types';

const history = createMemoryHistory();

type User = {
  id: number,
  name: string,
  email: string,
  password: string,
};

const UserModel: ModelDefinition<User> = Model.extend({});

type AppRegistry = Registry<{ users: typeof UserModel }, { }>
type AppSchema = Schema<AppRegistry>

const makeServer = (): Server => new Server({
  models: {
    users: Model,
  },
  routes: function() {
    this.timing = 100;
    this.urlPrefix = 'http://localhost:8080';
    this.logging = false;

    this.get('/user/me', async (schema: AppSchema, request) => {
      const user = await schema.find('users', request.queryParams.id);

      if (!user) {
        return new Response(400, {}, 'Usuário não encontrado');
      }

      return user.attrs;
    });

    this.post('/user/login', async (schema: AppSchema, request) => {
      const body = JSON.parse(request.requestBody);
      const user = await schema.findBy('users', {
        email: body.email,
        password: body.password,
      });

      if(!user) {
        return new Response(400, {}, 'Usuário não encontrado');
      }

      return user.attrs;
    });

    this.post('/user/create', async (schema: AppSchema, request) => {
      const body = JSON.parse(request.requestBody);

      const user = await schema.findBy('users', {
        email: body.email,
        password: body.password,
      });

      if(user) {
        return new Response(400, {}, 'Usuário duplicado');
      }

      await schema.create('users', {
        _id: 1,
        name: body.name,
        email: body.email,
        password: body.password,
      });

      const userData = await schema.find('users', '1');

      return userData?.attrs;
    });
  },
});

const renderSetup = (
  component: ReactNode,
  options?: Omit<RenderOptions, 'queries'>,
) => {
  return render (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        {component}
      </Router>
    </ThemeProvider>,
    options,
  )
};

export * from '@testing-library/react'
export { render as renderWihtoutTheme};
export { renderSetup as render };
export { history };
export { makeServer };
