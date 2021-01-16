import {
  FC,
  FormEvent,
  useState,
  useEffect,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouteComponentProps } from 'react-router';

import request from '../../utils/request';

import Layout from '../../components/Layout';
import Panel from '../../components/Panel';
import Input from '../../components/Input';
import Button, { ButtonVariant } from '../../components/Button';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import {
  Container,
  ContainerPanel,
  ContainerForm,
  ContainerText,
} from './styles';

const Login: FC<RouteComponentProps> = ({
  history,
}) => {
  const [sign, setSign] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  const handleSignForm = () => {
    setSign(!sign);
  };

  const validateName = () => {
    if (name.length < 3) {
      throw Error('Nome inválido');
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      throw Error('Senha inválida');
    }
  };

  const validateEmail = () => {
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
      throw Error('E-mail inválido');
    }
  };

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setName('');
    document.querySelectorAll('form').forEach((form) => {
      form.reset();
    });
  };

  const login = async () => {
    try {
      validateEmail();
      validatePassword();

      const user = await request.post('/user/login', {
        email,
        password,
      });

      await localStorage.setItem('user', JSON.stringify(user.data));

      toast.success('Login efetuado com sucesso', {
        hideProgressBar: true,
        pauseOnHover: false,
      });

      clearFields();
      history.push('/');
    } catch (error) {
      toast.error(error?.response?.data || error.message, {
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  };

  const createUser = async () => {
    try {
      validateEmail();
      validatePassword();
      validateName();

      const user = await request.post('/user/create', {
        email,
        name,
        password,
      });

      toast.success(`Usuário ${user.data.name} criado com sucesso!`, {
        hideProgressBar: true,
        pauseOnHover: false,
      });

      setSign(true);
      clearFields();
    } catch (error) {
      toast.error(error?.response?.data || error.message, {
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.dismiss();

    if (sign) {
      login();
      return;
    }

    createUser();
  };

  return (
    <Layout>
      <Container>
        <ContainerPanel sign={sign}>
          <Panel>
            <Logo className="logo" />

            <ContainerForm id="form-login" show={sign} onSubmit={onSubmit}>
              <Input
                id="email"
                label="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                label="Senha"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button id="sign" variant={ButtonVariant.primary}>Logar</Button>

              <ContainerText>
                Não é registrado?
                <a id="add-user" onClick={handleSignForm}>Criar conta</a>
              </ContainerText>
            </ContainerForm>

            <ContainerForm id="form-add" show={!sign} onSubmit={onSubmit}>
              <Input
                id="email-new"
                label="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="password-new"
                label="Senha"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                id="name-new"
                label="Nome"
                onChange={(e) => setName(e.target.value)}
              />
              <Button id="create-user" variant={ButtonVariant.primary}>Cadastrar</Button>

              <ContainerText>
                Já é registrado?
                <a onClick={handleSignForm} type="button">Logar</a>
              </ContainerText>
            </ContainerForm>

          </Panel>
        </ContainerPanel>
      </Container>

      <ToastContainer />
    </Layout>
  );
};

export default Login;
