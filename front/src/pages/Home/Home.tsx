import {
  FC,
  useEffect,
  useState,
} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { RouteComponentProps } from 'react-router';

import request from '../../utils/request';

import Layout from '../../components/Layout';
import Panel from '../../components/Panel';
import Button, { ButtonVariant } from '../../components/Button';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import {
  Container,
  ContainerPanel,
  UserData,
  UserRow,
  UserLabel,
} from './styles';

const Login: FC<RouteComponentProps> = ({
  history,
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getLoggedUser();
  }, []);

  const getLoggedUser = async () => {
    try {
      const loggedUser = await localStorage.getItem('user');
      const userParse = JSON.parse(loggedUser || '');
      const userData = await request.get(`/user/me?id=${userParse._id}`);

      if (!userData.data) {
        history.push('/login');
        return;
      }

      setUser(userData.data);
    } catch {
      history.push('/login');
    }
  };

  const logout = () => {
    history.push('/login');
  };

  return (
    <Layout>
      <Container>
        <ContainerPanel>
          <Panel>
            <Logo className="logo" />

            { user && (
              <UserData>
                <UserRow>
                  <UserLabel>nome</UserLabel>
                  {user?.name}
                </UserRow>
                <UserRow>
                  <UserLabel>email</UserLabel>
                  {user?.email}
                </UserRow>
              </UserData>
            )}

            <Button
              variant={ButtonVariant.danger}
              onClick={logout}
            >
              SAIR
            </Button>

          </Panel>
        </ContainerPanel>
      </Container>
    </Layout>
  );
};

export default Login;
