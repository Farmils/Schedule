import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { AttendanceType } from "../../../core/context/contextType.ts";
import { useEffect } from "react";
import * as XLSX from "xlsx";
import { WorkBook } from "xlsx";

const PresenceTable = () => {
  const { students, presences } = useGetGlobalContext();

  useEffect(() => {
    console.log(presences);
  }, []);

  if (students.length === 0) return <></>;

  const exportToExcelReport = () => {
    const wsData = [];
    const headers = ["ФИО", "Пропуск (КОЛ-ВО УРОКОВ)", "", "", "Проделанная работа"];
    wsData.push(headers);

    const subHeaders = ["", "По болезни", "Заявление", "По неуважительной причине"];
    wsData.push(subHeaders);

    students.forEach((student) => {
      const row = [student.fio];
      let illness = 0;
      let application = 0;
      let invalidExcused = 0;

      presences.forEach((presence) => {
        presence.subjects.forEach((subject) => {
          subject.presenceRow.forEach((presenceRow) => {
            if (presenceRow.studentId === student.studentId) {
              if (presenceRow.attendanceTypeId === 1) {
                illness++;
              } else if (presenceRow.attendanceTypeId === 2) {
                application++;
              } else if (presenceRow.attendanceTypeId === 3) {
                invalidExcused++;
              }
            }
          });
        });
      });

      row.push(illness.toString(), application.toString(), invalidExcused.toString());
      wsData.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb: WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Отчёт");
    XLSX.writeFile(wb, `Отчёт о посещаемости группы.xlsx`);
  };
  const exportToExcel = () => {
    const wsData = [];

    const headers = ["№", "ФИО Обучающегося"];
    presences.forEach((presence) => {
      Array.from({ length: 8 }).forEach(() => {
        headers.push(new Date(presence.presenceDate).toLocaleDateString());
      });
    });
    wsData.push(headers);

    const subHeaders = ["", ""];
    presences.forEach(() => {
      Array.from({ length: 8 }).forEach((_, colIdx) => {
        subHeaders.push((colIdx + 1).toString());
      });
    });
    wsData.push(subHeaders);

    students.forEach((student, studentIndex) => {
      const row = [studentIndex + 1, student.fio];
      presences.forEach((presence) => {
        Array.from({ length: 8 }).forEach((_, colIdx) => {
          const attendance = presence.subjects.flatMap((subject) =>
              subject.presenceRow.filter(
                  (row) =>
                      row.schedule.lessonNumber === colIdx + 1 &&
                      row.studentId === student.studentId,
              ),
          );
          row.push(attendance.length > 0 ? AttendanceType[attendance[0].attendanceTypeId] : "");
        });
      });
      wsData.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const startCol = 2;
    presences.forEach((_, index) => {
      ws["!merges"] = ws["!merges"] || [];
      ws["!merges"].push({
        s: { r: 0, c: startCol + index * 8 },
        e: { r: 0, c: startCol + index * 8 + 7 }
      });
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Посещамость");
    XLSX.writeFile(wb, `Посещаемость Группы .xlsx`);
  };


  return (
      <div className={"relative overflow-x-auto"}>
        <button onClick={exportToExcelReport} className={"mb-4 p-1 bg-black ml-1 text-white rounded"}>
          Экспортировать в Excel в форме отчёта
        </button>
        <button onClick={exportToExcel} className={"mb-4 p-1 bg-black ml-1 text-white rounded"}>
          Экспортировать в Excel
        </button>
        <table className={"text-sm text-black w-full"}>
          <thead className={"text-black w-full border border-separate border-black"}>
          <tr>
            <th className={"border-black border-2 border-collapse"}>№</th>
            <th className={"border-black border-2 border-separate"}>ФИО Обучающегося</th>
            {presences.map((presence, index) => (
                <th key={index} colSpan={8} className={"border-black border-2 border-separate"}>
                  {new Date(presence.presenceDate).toLocaleDateString()}
                </th>
            ))}
          </tr>
          <tr>
            <th className={"border-black border-2 border-collapse"}></th>
            <th className={"border-black border-2 border-collapse"}></th>
            {presences.map((_, index) =>
                Array.from({length: 8}).map((_, colIdx) => (
                    <th key={`${index}-${colIdx}`} className={"border-black border-2 border-separate"}>
                      {colIdx + 1}
                    </th>
                )),
            )}
          </tr>
          </thead>
          <tbody className={"bg-white border-separate border border-black text-center overflow-x-auto"}>
          {students.map((student, studentIndex) => (
              <tr key={studentIndex} className={"border-separate border border-black text-center"}>
                <td className={"border-separate border border-black text-center"}>
                  {studentIndex + 1}
                </td>
                <td className={"border-separate border border-black text-center"}>
                  {student.fio}
                </td>
                {presences.map((presence) =>
                    Array.from({length: 8}).map((_, colIdx) => {
                      const attendance = presence.subjects.flatMap((subject) =>
                          subject.presenceRow.filter(
                              (row) =>
                                  row.schedule.lessonNumber === colIdx + 1 &&
                                  row.studentId === student.studentId,
                          ),
                      );
                      return (
                          <td key={`${studentIndex}-${colIdx}`}
                              className={"border-separate border border-black text-center"}>
                            {attendance.length > 0 ? AttendanceType[attendance[0].attendanceTypeId] : ""}
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

export {PresenceTable};
