import { FC, useEffect } from "react";
import { Header } from "../../components/header/Header.tsx";
import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { ProfileCard } from "../../components/profileCard/ProfileCard.tsx";

const ProfilePage: FC = () => {
  const { profile } = useGetGlobalContext();
  useEffect(() => {
    (async () => {
      console.log(profile);
    })();
  }, []);

  return (
    <>
      <Header />
      <ProfileCard />
    </>
  );
};
export { ProfilePage };
