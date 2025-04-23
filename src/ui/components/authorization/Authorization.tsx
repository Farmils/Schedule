import { FC } from "react";
type Authorization = {
  login: string;
  password: string;
};
const Authorization: FC = () => {
  const submitAuthorization = async (event: any) => {
    event.preventDefault();
    const login: Authorization = event.target[0].value;
    const password: Authorization = event.target[1].value;
    try {
      const response = await fetch(
        "http://185.207.0.137:8080/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            login,
            password,
          }),
        },
      );
      const data: object = await response.json();
    } catch (e) {
      console.log(e);
    }
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
export { Authorization };
