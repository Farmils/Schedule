import { FC, useEffect } from "react";
import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { getSchedule } from "../../../core/api/login-api.ts";

const ScheduleTable: FC = () => {
  const {
    setSchedule,
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
      const response = await getSchedule();
      console.log(response.data);
      setSchedule(response.data);
      replaceMon();
      replaceTues();
      replaceWen();
      replaceThur();
      replaceFri();
      replaceSatur();
    })();
  }, [setSchedule]);
  return (
    <div className={"relative overflow-x-auto"}>
      <table className={"w-4xl text-sm text-left rtl:text-right text-white"}>
        <thead className={"bg-amber-400 "}>
          <tr>
            <td></td>
            <td> {arrayStr[0]}</td>
            <td> {arrayStr[1]}</td>
            <td> {arrayStr[2]}</td>
            <td> {arrayStr[3]}</td>
            <td> {arrayStr[4]}</td>
            <td> {arrayStr[5]}</td>
            <td> {arrayStr[6]}</td>
            <td> {arrayStr[7]}</td>
          </tr>
        </thead>

        <tbody
          className={
            "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          }
        >
          {arrayNum.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
              {monday.map((lesson, index) => (
                <td key={index}>
                  {lesson.lessonNumber === item ? (
                    <td>
                      {lesson.subject.name} {lesson.audience}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </td>
              ))}
              {tuesday.map((lesson, index) => (
                <td key={index}>
                  {lesson.lessonNumber === item ? (
                    <td>
                      {lesson.subject.name} {lesson.audience}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </td>
              ))}
              {wednesday.map((lesson, index) => (
                <td key={index}>
                  {lesson.lessonNumber === item ? (
                    <td>
                      {lesson.subject.name} {lesson.audience}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </td>
              ))}
              {thursday.map((lesson, index) => (
                <td key={index}>
                  {lesson.lessonNumber === item ? (
                    <td>
                      {lesson.subject.name} {lesson.audience}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </td>
              ))}{" "}
              {friday.map((lesson, index) => (
                <td key={index}>
                  {lesson.lessonNumber === item ? (
                    <td>
                      {lesson.subject.name} {lesson.audience}
                    </td>
                  ) : (
                    <td></td>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export { ScheduleTable };
