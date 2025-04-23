import { FC } from "react";
import { Header } from "../../components/header/Header.tsx";
import { Authorization } from "../../components/authorization/Authorization.tsx";

const MainPage: FC = () => {
  return (
    <>
      <Header />
      <Authorization />
    </>
  );
};
export { MainPage };
