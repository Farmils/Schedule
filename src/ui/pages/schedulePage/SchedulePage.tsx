import { FC } from "react";
import { Header } from "../../components/header/Header.tsx";
import { ScheduleTable } from "../../components/scheduleTable/ScheduleTable.tsx";

const SchedulePage: FC = () => {
  return (
    <>
      <Header />
      <ScheduleTable />
    </>
  );
};
export { SchedulePage };
