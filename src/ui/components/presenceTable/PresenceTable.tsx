import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { useEffect } from "react";

const PresenceTable = () => {
  const { students } = useGetGlobalContext();
  useEffect(() => {
    console.log(students);
  }, [students]);
  if (students.length === 0) return <>Данные подгружаются</>;
  return (
    <div className={"relative overflow-x-auto"}>
      <table className={"text-sm  text-black w-full  "}>
        <thead className={"bg-black text-white"}>
          <td>№</td>
          <td>ФИО Обучающегося</td>

          <td>Даты</td>

          {Array.from({ length: 8 }).map((_, i) => (
            <td>{i + 1}</td>
          ))}
        </thead>
        <tbody className={"bg-white border-separate border "}>
          {students.map((element, index) => (
            <tr key={index} className=" border-separate border  border-black">
              <td className={"border-separate border  border-black"}>
                {index}
              </td>
              <td className={"px-4 py-2 border-separate border  border-black"}>
                {element.fio}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { PresenceTable };
