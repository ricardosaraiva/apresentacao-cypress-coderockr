import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
  makeServer,
  history,
} from "../../utils/test-utils";
import { Route } from "react-router-dom";

import Login from "./Login";
import { Server } from "miragejs";

describe("Screen Login: render form", () => {
  let el: RenderResult;
  let server: Server;
  beforeEach(() => {
    el = render(<Route component={Login} path="*" exact />);
    server?.shutdown();
    server = makeServer();
  });

  test("Deve exibir o formulário de login por padrão", () => {
    const { container } = el;

    const addUser = container.querySelector("#add-user") as Element;
    fireEvent.click(addUser);

    const form = container.querySelector("#form-add") as Element;

    const formLogin = container.querySelector("#form-login") as Element;
    const formAdd = container.querySelector("#form-add") as Element;

    expect(window.getComputedStyle(formLogin).opacity).toEqual("0");
    expect(window.getComputedStyle(formAdd).opacity).toEqual("1");
  });

  test("Deve exibir o formulário de cadastro de usuário ao clicar no botão de criar conta", () => {
    const { container } = el;

    const addUser = container.querySelector("#add-user") as Element;
    fireEvent.click(addUser);

    const form = container.querySelector("#form-add") as Element;

    const formLogin = container.querySelector("#form-login") as Element;
    const formAdd = container.querySelector("#form-add") as Element;

    expect(window.getComputedStyle(formLogin).opacity).toEqual("0");
    expect(window.getComputedStyle(formAdd).opacity).toEqual("1");
  });

  test("Deve exibir o formulário de login ao clicar no botão de logar", () => {
    const { container } = el;

    const addUser = container.querySelector("#add-user") as Element;
    fireEvent.click(addUser);
    fireEvent.click(addUser);

    const formLogin = container.querySelector("#form-login") as Element;
    const formAdd = container.querySelector("#form-add") as Element;

    expect(window.getComputedStyle(formLogin).opacity).toEqual("1");
    expect(window.getComputedStyle(formAdd).opacity).toEqual("0");
  });

  describe("Logar", () => {
    test("Deve exibir um erro ao tentar logar sem preencher nenhum campo", async () => {
      const { container } = el;

      const btnLogin = container.querySelector("#sign") as Element;
      fireEvent.click(btnLogin);

      await waitFor(() => {
        const toast = container.querySelector(".Toastify div") as Element;
        expect(window.getComputedStyle(toast).display).toBeTruthy();
        expect(toast.textContent).toContain("E-mail inválido");
      });
    });

    test.each(["", "invali@.com", "@.com", "_@.com"])(
      "Deve exibir um erro ao tentar logar informando e-mail inválido",
      async (mail) => {
        const { container } = el;

        const inputEmail = container.querySelector(
          "#email"
        ) as HTMLInputElement;
        const btnLogin = container.querySelector("#sign") as Element;
        fireEvent.change(inputEmail, { target: { value: mail } });
        fireEvent.click(btnLogin);

        await waitFor(() => {
          const toast = container.querySelector(".Toastify div") as Element;
          expect(window.getComputedStyle(toast).display).toBeTruthy();
          expect(toast.textContent).toContain("E-mail inválido");
        });
      }
    );

    test.each(["", "a", "ata", "atafd"])(
      "Deve exibir um erro ao tentar logar informando e-mail válido e senha inválida",
      async (password) => {
        const { container } = el;

        const inputEmail = container.querySelector(
          "#email"
        ) as HTMLInputElement;
        const inputPassword = container.querySelector(
          "#password"
        ) as HTMLInputElement;
        const btnLogin = container.querySelector("#sign") as Element;
        fireEvent.change(inputEmail, {
          target: { value: "example@teste.com" },
        });
        fireEvent.change(inputPassword, { target: { value: password } });
        fireEvent.click(btnLogin);

        await waitFor(() => {
          const toast = container.querySelector(".Toastify div") as Element;
          expect(window.getComputedStyle(toast).display).toBeTruthy();
          expect(toast.textContent).toContain("Senha inválida");
        });
      }
    );

    test("Deve retorar o erro da api ao tentar logar com usuário invalido", async () => {
      const { container } = el;

      const inputEmail = container.querySelector("#email") as HTMLInputElement;
      const inputPassword = container.querySelector(
        "#password"
      ) as HTMLInputElement;
      const btnLogin = container.querySelector("#sign") as Element;
      fireEvent.change(inputEmail, { target: { value: "example@teste.com" } });
      fireEvent.change(inputPassword, { target: { value: "123456" } });
      fireEvent.click(btnLogin);

      await waitFor(() => {
        const toast = container.querySelector(".Toastify div") as Element;
        expect(toast.textContent).toContain("Usuário não encontrado");
      });
    });

    test("Deve retornar sucesso ao logar com um usuárior válido", async () => {
      const { container } = el;
      jest.spyOn(history, "push");

      await server.schema.users.create({
        _id: 1,
        name: "user",
        email: "user@user.com",
        password: "123456",
      });

      const inputEmail = container.querySelector("#email") as HTMLInputElement;
      const inputPassword = container.querySelector(
        "#password"
      ) as HTMLInputElement;
      const btnLogin = container.querySelector("#sign") as Element;
      fireEvent.change(inputEmail, { target: { value: "user@user.com" } });
      fireEvent.change(inputPassword, { target: { value: "123456" } });
      fireEvent.click(btnLogin);

      await waitFor(() => {
        expect(history.push).toHaveBeenCalledTimes(1);
        expect(history.push).toHaveBeenCalledWith("/");
        expect(window.localStorage.getItem("user")).toMatchInlineSnapshot(
          `"{\\"_id\\":1,\\"name\\":\\"user\\",\\"email\\":\\"user@user.com\\",\\"password\\":\\"123456\\",\\"id\\":\\"1\\"}"`
        );
      });
    });
  });

  describe("Cria usuário", () => {
    test("Deve exibir um erro ao tentar criar um usuário sem preencher nenhum campo", async () => {
      const { container } = el;

      const addUser = container.querySelector("#add-user") as Element;
      fireEvent.click(addUser);

      const btnAddUser = container.querySelector("#create-user") as Element;
      fireEvent.click(btnAddUser);

      await waitFor(() => {
        const toast = container.querySelector(".Toastify div") as Element;
        expect(window.getComputedStyle(toast).display).toBeTruthy();
        expect(toast.textContent).toContain("E-mail inválido");
      });
    });

    test.each(["", "invali@.com", "@.com", "_@.com"])(
      "Deve exibir um erro ao tentar criar um usuário informando e-mail inválido",
      async (mail) => {
        const { container } = el;

        const addUser = container.querySelector("#add-user") as Element;
        fireEvent.click(addUser);

        const inputEmail = container.querySelector(
          "#email-new"
        ) as HTMLInputElement;
        const btnAddUser = container.querySelector("#create-user") as Element;
        fireEvent.change(inputEmail, { target: { value: mail } });
        fireEvent.click(btnAddUser);

        await waitFor(() => {
          const toast = container.querySelector(".Toastify div") as Element;
          expect(window.getComputedStyle(toast).display).toBeTruthy();
          expect(toast.textContent).toContain("E-mail inválido");
        });
      }
    );

    test.each(["", "a", "ata", "atafd"])(
      "Deve exibir um erro ao tentar criar um usuário informando e-mail válido e senha inválida",
      async (password) => {
        const { container } = el;

        const addUser = container.querySelector("#add-user") as Element;
        fireEvent.click(addUser);

        const inputEmail = container.querySelector(
          "#email-new"
        ) as HTMLInputElement;
        const inputPassword = container.querySelector(
          "#password-new"
        ) as HTMLInputElement;
        const btnAddUser = container.querySelector("#create-user") as Element;
        fireEvent.change(inputEmail, { target: { value: "new@user.com" } });
        fireEvent.change(inputPassword, { target: { value: password } });
        fireEvent.click(btnAddUser);

        await waitFor(() => {
          const toast = container.querySelector(".Toastify div") as Element;
          expect(window.getComputedStyle(toast).display).toBeTruthy();
          expect(toast.textContent).toContain("Senha inválida");
        });
      }
    );

    test.each(["", "a", "ab"])(
      "Deve exibir um erro ao tentar criar um usuário informando e-mail e senha válidos e nome inválida",
      async (name) => {
        const { container } = el;

        const addUser = container.querySelector("#add-user") as Element;
        fireEvent.click(addUser);

        const inputEmail = container.querySelector(
          "#email-new"
        ) as HTMLInputElement;
        const inputPassword = container.querySelector(
          "#password-new"
        ) as HTMLInputElement;
        const inputName = container.querySelector(
          "#name-new"
        ) as HTMLInputElement;
        const btnAddUser = container.querySelector("#create-user") as Element;
        fireEvent.change(inputEmail, { target: { value: "new@user.com" } });
        fireEvent.change(inputPassword, { target: { value: "654789sd" } });
        fireEvent.change(inputName, { target: { value: name } });
        fireEvent.click(btnAddUser);

        await waitFor(() => {
          const toast = container.querySelector(".Toastify div") as Element;
          expect(window.getComputedStyle(toast).display).toBeTruthy();
          expect(toast.textContent).toContain("Nome inválido");
        });
      }
    );

    test("Deve retornar sucesso ao criar um usuário", async () => {
      const { container } = el;

      const addUser = container.querySelector("#add-user") as Element;
      fireEvent.click(addUser);

      const inputEmail = container.querySelector(
        "#email-new"
      ) as HTMLInputElement;
      const inputPassword = container.querySelector(
        "#password-new"
      ) as HTMLInputElement;
      const inputName = container.querySelector(
        "#name-new"
      ) as HTMLInputElement;
      const btnLogin = container.querySelector("#create-user") as Element;
      fireEvent.change(inputEmail, { target: { value: "user@user.com" } });
      fireEvent.change(inputPassword, { target: { value: "123456" } });
      fireEvent.change(inputName, { target: { value: "Ricardo Saraiva" } });
      fireEvent.click(btnLogin);

      await waitFor(() => {
        const toast = container.querySelector(".Toastify div") as Element;
        expect(window.getComputedStyle(toast).display).toBeTruthy();
        expect(toast.textContent).toContain(
          "Usuário Ricardo Saraiva criado com sucesso!"
        );
      });
    });

    test("Deve retornar erro ao tentar criar o mesmo usuário mais de uma vez", async () => {
      const { container } = el;

      await server.schema.users.create({
        _id: 1,
        name: "Ricardo Saraiva",
        email: "duplicate@user.com",
        password: "123456",
      });

      const addUser = container.querySelector("#add-user") as Element;
      fireEvent.click(addUser);

      const inputEmail = container.querySelector(
        "#email-new"
      ) as HTMLInputElement;
      const inputPassword = container.querySelector(
        "#password-new"
      ) as HTMLInputElement;
      const inputName = container.querySelector(
        "#name-new"
      ) as HTMLInputElement;
      const btnLogin = container.querySelector("#create-user") as Element;

      fireEvent.change(inputEmail, { target: { value: "duplicate@user.com" } });
      fireEvent.change(inputPassword, { target: { value: "123456" } });
      fireEvent.change(inputName, { target: { value: "Ricardo Saraiva" } });
      fireEvent.click(btnLogin);

      await waitFor(() => {
        const toast = container.querySelector(".Toastify div") as Element;
        expect(window.getComputedStyle(toast).display).toBeTruthy();
        expect(toast.textContent).toContain("Usuário duplicado");
      });
    });
  });
});
