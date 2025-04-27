import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useGetGlobalContext } from "../../../core/context/Context";
import { AuthData } from "../../../core/api/types";
import { loginApi } from "../../../core/api/login-api";

const Authorization: FC = () => {
  const { setProfile } = useGetGlobalContext();
  const nav = useNavigate();

  const submitAuthorization = async (event: any) => {
    event.preventDefault();
    const login = event.target[0].value;
    const password = event.target[1].value;

    const authData: AuthData = {
      login: login,
      password: password,
    };

    try {
      const response = await loginApi(authData);
      console.log(response.data);
      setProfile(response.data);
      nav("/schedule");
    } catch (e) {
      console.warn(e)
]    }
  };
  return (
      <div className={"flex flex-col items-center m-5"}>
        <p className={"text-black-800 text-2xl font-medium "}>Авторизация</p>
        <form onSubmit={submitAuthorization}>
          <div className={"flex flex-col"}>
            <label>Логин</label>
            <input
                type={"text"}
                className={"bg-gray-100 border broder gray-300 rounded-lg"}
                placeholder={"логин"}
            />
          </div>
          <div className={"flex flex-col"}>
            <label>Пароль</label>
            <input
                type={"text"}
                className={"bg-gray-100 border broder gray-300 rounded-lg"}
                placeholder={"пароль"}
            />
          </div>
          <button
              type={"submit"}
              className={
                "text-white bg-gray-900 rounded-xl text-sm px-5 py-2.5 m-3 "
              }
          >
            Авторизоваться
          </button>
        </form>
      </div>
  );
};
export {Authorization};
