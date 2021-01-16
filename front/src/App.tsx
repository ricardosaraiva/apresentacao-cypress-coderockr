import { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './utils/theme';
import GlobalStyles from './utils/GlobalStyle';

import Login from './pages/Login';
import Home from './pages/Home';

const App: FC<{}> = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <BrowserRouter>
      <Switch>
        <Route component={Login} exact path="/login" />
        <Route component={Home} exact path="*" />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
