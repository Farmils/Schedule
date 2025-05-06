import { FC } from "react";
import { Header } from "../../components/header/Header.tsx";
import { GroupSelector } from "../../components/groupSelector/GroupSelector.tsx";

const SchedulePage: FC = () => {
  return (
    <>
      <Header />
      <GroupSelector />
    </>
  );
};
export { SchedulePage };
