import { ReactNode, useEffect } from "react";
import { useGetGlobalContext } from "../../../core/context/Context.tsx";

const ProfileCard = (): ReactNode => {
  const { profile } = useGetGlobalContext();
  useEffect(() => {
    (async () => {
      console.log(profile);
    })();
  }, []);

  return (
    <div className=" flex flex-col max-w-sm rounded overflow-hidden shadow-lg space-y-5 items-center">
      <p className="font-bold text-xl mb-2">Профиль</p>
      <p>ФИО: {profile.user.fio}</p>
      <p>Email: {profile.user.email}</p>
      <p>Номер: {profile.user.number}</p>
      <p>{profile.user.role.name}</p>
      <p></p>
    </div>
  );
};
export { ProfileCard };
