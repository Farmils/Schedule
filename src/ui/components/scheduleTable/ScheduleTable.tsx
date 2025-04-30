import { FC, useEffect } from "react";
import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { Schedule } from "../../../core/context/contextType.ts";
import { GroupSelector } from "../groupSelector/GroupSelector.tsx";

const ScheduleTable: FC = () => {
  let lessons: Schedule[] = [];
  const {
    schedule,
    monday,
    setMonday,
    tuesday,
    setTuesday,
    wednesday,
    setWednesday,
    thursday,
    setThursday,
    friday,
    setFriday,
    saturday,
    setSaturday,
  } = useGetGlobalContext();

  const arrayNum: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  const arrayStr: string[] = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  const replaceMon = () => {
    const arr = schedule.filter((value) => value.dayOfWeek === 1);
    setMonday(arr);
    return arr;
  };

  const replaceTues = () => {
    const arr = schedule.filter((value) => value.dayOfWeek === 2);
    setTuesday(arr);
    return arr;
  };

  const replaceWen = () => {
    const arr = schedule.filter((value) => value.dayOfWeek === 3);
    setWednesday(arr);
    return arr;
  };

  const replaceThur = () => {
    const arr = schedule.filter((value) => value.dayOfWeek === 4);
    setThursday(arr);
    return arr;
  };

  const replaceFri = () => {
    const arr = schedule.filter((value) => value.dayOfWeek === 5);
    setFriday(arr);
    return arr;
  };

  const replaceSatur = () => {
    const arr = schedule.filter((value) => value.dayOfWeek === 6);
    setSaturday(arr);
    return arr;
  };

  useEffect(() => {
    (async () => {
      replaceMon();
      replaceTues();
      replaceWen();
      replaceThur();
      replaceFri();
      replaceSatur();
    })();
  }, []);

  return (
    <>
      <GroupSelector />
      {schedule === undefined ? (
        <></>
      ) : (
        <div className={"relative overflow-x-auto"}>
          <table className={"text-sm  text-black w-full  "}>
            <thead className={"bg-black text-white"}>
              <tr>
                <th></th>
                {arrayStr.map((day, index) => (
                  <th key={index} className="px-4 py-2">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={"bg-white border-separate border "}>
              {arrayNum.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="px-4 py-2 border-separate border  border-black">
                    {item}
                  </td>
                  {arrayStr.map((day, colIndex) => {
                    if (day === "Понедельник") lessons = monday;
                    if (day === "Вторник") lessons = tuesday;
                    if (day === "Среда") lessons = wednesday;
                    if (day === "Четверг") lessons = thursday;
                    if (day === "Пятница") lessons = friday;
                    if (day === "Суббота") lessons = saturday;

                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-2 border-separate border  border-black "
                      >
                        {lessons.find(
                          (lesson: Schedule) => lesson.lessonNumber === item,
                        ) ? (
                          <td className={"text-sm font-bold"}>
                            {
                              lessons.find(
                                (lesson: Schedule) =>
                                  lesson.lessonNumber === item,
                              )?.subject.name
                            }

                            {
                              lessons.find(
                                (lesson: Schedule) =>
                                  lesson.lessonNumber === item,
                              )?.audience
                            }
                          </td>
                        ) : (
                          <></>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export { ScheduleTable };
