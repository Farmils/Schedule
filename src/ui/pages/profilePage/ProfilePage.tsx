import { FC, useEffect } from "react";
import { Header } from "../../components/header/Header.tsx";

const ProfilePage: FC = () => {
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://185.207.0.137:8080/api/v1/group/1/students",
      );
      const data = await response.json();
      console.log(data);
    })();
  }, []);
  return (
    <>
      <Header />
    </>
  );
};
export { ProfilePage };
