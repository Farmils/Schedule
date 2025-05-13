import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { useEffect } from "react";
import { AttendanceType } from "../../../core/context/contextType.ts";

const PresenceTable = () => {
  const { students, presences } = useGetGlobalContext();

  useEffect(() => {
    console.log(students);
    console.log(presences);
  }, [students]);
  if (students.length === 0) return <></>;
  return (
    <div className={"relative overflow-x-auto"}>
      <table className={"text-sm  text-black w-full  "}>
        <thead className={"bg-black text-white  "}>
          <tr>
            <td>№</td>
            <td>ФИО Обучающегося</td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody
          className={
            "bg-white border-separate border  border-black text-center"
          }
        >
          {presences.map((item, index) => (
            <td key={index} className={"border border-separate border-black"}>
              {new Date(item.presenceDate).toLocaleDateString()}
              <td></td>
              <td></td>

              {Array.from({ length: 8 }).map((_, rowIndex) => (
                <td className={" px-1.5 border border-separate border-black"}>
                  {" "}
                  {rowIndex + 1}
                </td>
              ))}

              {students.map((item, studentIndex) => (
                <tr>
                  <td
                    key={studentIndex}
                    className={"border border-separate border-black"}
                  >
                    {studentIndex + 1}
                  </td>
                  <td className={"border border-separate border-black"}>
                    {item.fio}
                  </td>
                  {presences.map((item, presenceIndex) => {
                    const presence = item.subjects[index];
                    if (!presence) {
                      return <td></td>;
                    }
                    return (
                      <td>
                        {
                          item.subjects[index].presenceRow[index].schedule
                            .subject.name
                        }
                      </td>
                    );
                  })}
                </tr>
              ))}
            </td>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { PresenceTable };
