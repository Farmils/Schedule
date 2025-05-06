import { useEffect } from "react";
import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { DayOfWeek } from "../../../core/context/contextType.ts";

const ScheduleTable = () => {
  const { schedule, fetchSchedule } = useGetGlobalContext();
  // const arrayNum: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    (async () => {
      await fetchSchedule(1);
    })();
  }, [fetchSchedule]);

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  if (schedule.length === 0) {
    return <></>;
  }

  return (
    <div className={"relative overflow-x-auto"}>
      <table className={"text-sm  text-black w-full  "}>
        <thead className={"bg-black text-white"}>
          <td></td>
          {schedule.map((item, index) => (
            <td key={index}>{DayOfWeek[item.dayOfWeek]}</td>
          ))}
        </thead>
        <tbody className={"bg-white border-separate border "}>
          {Array.from({ length: 8 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-4 py-2 border-separate border  border-black">
                {rowIndex + 1}
              </td>
              {Array.from({ length: 6 }).map((_, cellIdx) => {
                if (!schedule[cellIdx].subjects[rowIndex]) return;

                return (
                  <td
                    className="px-4 py-2 border-separate border  border-black"
                    key={cellIdx}
                  >
                    {schedule[cellIdx].subjects[rowIndex].subject.name}
                    <strong>
                      {schedule[cellIdx].subjects[rowIndex].audience}
                    </strong>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ScheduleTable };
