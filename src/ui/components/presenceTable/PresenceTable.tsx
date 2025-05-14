import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { AttendanceType } from "../../../core/context/contextType.ts";
import { useEffect } from "react";

const PresenceTable = () => {
  const { students, presences } = useGetGlobalContext();

  useEffect(() => {
    console.log(presences);
  }, []);

  if (students.length === 0) return <></>;

  return (
    <div className={"relative overflow-x-auto"}>
      <table className={"text-sm text-black w-full"}>
        <thead
          className={"text-black w-full border border-separate border-black"}
        >
          <tr>
            <th className={"border-black border-2 border-collapse"}>№</th>
            <th className={"border-black border-2 border-separate"}>
              ФИО Обучающегося
            </th>
            {presences.map((presence, index) => (
              <th
                key={index}
                colSpan={8}
                className={"border-black border-2 border-separate"}
              >
                {new Date(presence.presenceDate).toLocaleDateString()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={"bg-white border-separate border border-black text-center"}
        >
          <tr>
            <th className={"border-black border-2 border-collapse"}></th>
            <th className={"border-black border-2 border-collapse"}></th>
            {presences.map((_, index) =>
              Array.from({ length: 8 }).map((_, colIdx) => (
                <th
                  key={`${index}-${colIdx}`}
                  className={"border-black border-2 border-separate"}
                >
                  {colIdx + 1}
                </th>
              )),
            )}
          </tr>
          {students.map((student, studentIndex) => (
            <tr
              key={studentIndex}
              className={"border-separate border border-black text-center"}
            >
              <td className={"border-separate border border-black text-center"}>
                {studentIndex + 1}
              </td>
              <td className={"border-separate border border-black text-center"}>
                {student.fio}
              </td>
              {presences.map((presence) =>
                Array.from({ length: 8 }).map((_, colIdx) => {
                  const attendance = presence.subjects.flatMap((subject) =>
                    subject.presenceRow.filter(
                      (row) =>
                        row.schedule.lessonNumber === colIdx + 1 &&
                        row.studentId === student.studentId,
                    ),
                  );
                  return (
                    <td
                      key={`${studentIndex}-${colIdx}`}
                      className={
                        "border-separate border border-black text-center"
                      }
                    >
                      {attendance.length > 0
                        ? AttendanceType[attendance[0].attendanceTypeId]
                        : ""}
                    </td>
                  );
                }),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { PresenceTable };
