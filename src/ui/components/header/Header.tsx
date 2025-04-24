import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useGetGlobalContext } from "../../../core/context/Context";

const Header: FC = () => {
  // const { setProfile } = useGetGlobalContext();
  const nav = useNavigate();
  const exit: () => void = () => {
    nav("/");
  };
  return (
    <div
      className={"flex space-x-25 justify-center "}
      style={{ backgroundColor: "#D9D9D9" }}
    >
      <Link to={"/profile"} className={"text-xl"} style={{ color: "#2C2C2C" }}>
        Профиль
      </Link>
      <Link
        to={"/schedule"}
        className={" text-xl"}
        style={{ color: "#2C2C2C" }}
      >
        Расписание
      </Link>
      <button onClick={exit}>Выйти</button>
    </div>
  );
};
export { Header };
