import { useEffect } from "react";
import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { DayOfWeek } from "../../../core/context/contextType.ts";

const ScheduleTable = () => {
  const { schedule, fetchSchedule } = useGetGlobalContext();
  const arrayNum: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    (async () => {
      await fetchSchedule(1);
    })();
  }, [fetchSchedule]);

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  if (schedule === null) {
    return <></>;
  }

  return (
    <div className={"relative overflow-x-auto"}>
      <table className={"text-sm  text-black w-full  "}>
        <thead className={"bg-black text-white"}>
          <th>{DayOfWeek[1]} </th> <th>{DayOfWeek[2]}</th>{" "}
          <th>{DayOfWeek[3]}</th> <th>{DayOfWeek[4]}</th>{" "}
          <th>{DayOfWeek[5]}</th> <th>{DayOfWeek[6]}</th>
        </thead>
        <tbody className={"bg-white border-separate border "}>
          {arrayNum.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-4 py-2 border-separate border  border-black">
                {item}
              </td>
            </tr>
          ))}
          {}
          {}
        </tbody>
      </table>
    </div>
  );
};

export { ScheduleTable };
