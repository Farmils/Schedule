import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { DayOfWeek } from "../../../core/context/contextType.ts";

const ScheduleTable = () => {
  const { schedule } = useGetGlobalContext();

  if (!schedule || schedule.length === 0) {
    return <div></div>;
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
              {schedule.map((element, cellIdx) => {
                const subject = element.subjects?.[rowIndex];
                if (!subject) {
                  return (
                    <td
                      key={cellIdx}
                      className="px-4 py-2 border-separate border border-black"
                    ></td>
                  );
                }
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
