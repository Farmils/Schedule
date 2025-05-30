import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { FC, useEffect } from "react";
import * as XLSX from "xlsx";
import { WorkBook } from "xlsx";

const PresenceTable: FC = () => {
  const { students, presences, statistic } = useGetGlobalContext();

  useEffect(() => {
    console.log(presences, statistic);
  }, [presences]);

  if (students.length === 0) return <></>;

  const exportToExcelReport = () => {
    const wsData = [];
    const headers = ["ФИО", "Пропуск (КОЛ-ВО УРОКОВ)", "", "", "Проделанная работа", "Статистика", "", ""];
    wsData.push(headers);

    const subHeaders = ["", "По болезни", "Заявление", "По неуважительной причине", "Всего пропусков", "По уважительной причине", "По неуважительной причине"];
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
              if (presenceRow.attendanceType.name === "болезнь") {
                illness++;
              } else if (presenceRow.attendanceType.name === "соревнования") {
                application++;
              } else if (presenceRow.attendanceType.name === "отсутствует") {
                invalidExcused++;
              }
            }
          });
        });
      });

      const studentStat = statistic.find(stat => stat.studentId === student.studentId);
      row.push(
          illness.toString(),
          application.toString(),
          invalidExcused.toString(),
          "",
          studentStat ? studentStat.missedTotal.toString() : "0",
          studentStat ? studentStat.missedByGoodReason.toString() : "0",
          studentStat ? studentStat.missedByBadReason.toString() : "0"
      );
      wsData.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb: WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Отчёт");
    XLSX.writeFile(wb, `Отчёт о посещаемости группы.xlsx`);
  };

  const exportToExcel = () => {
    const wsData = [];

    const headers = ["№", "ФИО Обучающегося", "Статистика", "", ""];
    presences.forEach((presence) => {
      Array.from({ length: 8 }).forEach(() => {
        headers.push(new Date(presence.presenceDate).toLocaleDateString());
      });
    });
    wsData.push(headers);

    const subHeaders = ["", "", "Всего пропусков", "По уважительной причине", "По неуважительной причине"];
    presences.forEach(() => {
      Array.from({ length: 8 }).forEach((_, colIdx) => {
        subHeaders.push((colIdx + 1).toString());
      });
    });
    wsData.push(subHeaders);

    students.forEach((student, studentIndex) => {
      const row = [studentIndex + 1, student.fio];
      const studentStat = statistic.find(stat => stat.studentId === student.studentId);
      row.push(
          studentStat ? studentStat.missedTotal.toString() : "0",
          studentStat ? studentStat.missedByGoodReason.toString() : "0",
          studentStat ? studentStat.missedByBadReason.toString() : "0"
      );
      presences.forEach((presence) => {
        Array.from({ length: 8 }).forEach((_, colIdx) => {
          const attendance = presence.subjects.flatMap((subject) =>
              subject.presenceRow.filter(
                  (row) =>
                      row.schedule.lessonNumber === colIdx + 1 &&
                      row.studentId === student.studentId,
              ),
          );
          row.push(attendance.length > 0 ? attendance[0].attendanceType.name : "");
        });
      });
      wsData.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    const startCol = 5;
    presences.forEach((_, index) => {
      ws["!merges"] = ws["!merges"] || [];
      ws["!merges"].push({
        s: { r: 0, c: startCol + index * 8 },
        e: { r: 0, c: startCol + index * 8 + 7 },
      });
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Посещаемость");
    XLSX.writeFile(wb, `Посещаемость Группы.xlsx`);
  };

  return (
      <div className="relative overflow-x-auto">
        <button
            onClick={exportToExcelReport}
            className="mb-4 p-2 bg-black ml-1 text-white rounded"
        >
          Экспортировать в Excel в форме отчёта
        </button>
        <button
            onClick={exportToExcel}
            className="mb-4 p-2 bg-black ml-1 text-white rounded"
        >
          Экспортировать в Excel
        </button>
        <table className="text-sm text-black w-full">
          <thead className="text-black w-full border border-separate border-black">
          <tr>
            <th className="border-black bg-white border-2 border-collapse sticky left-0 z-10">
              №
            </th>
            <th className="border-black bg-white border-2 border-separate sticky left-[17px] z-10">
              ФИО Обучающегося
            </th>
            <th className="border-black bg-white border-2 border-separate" colSpan={3}>
              Статистика
            </th>
            {presences.map((presence, index) => (
                <th key={index} colSpan={8} className="border-black border-2 border-separate">
                  {new Date(presence.presenceDate).toLocaleDateString()}
                </th>
            ))}
          </tr>
          <tr>
            <th className="border-black border-2 border-collapse"></th>
            <th className="border-black border-2 border-collapse"></th>
            <th className="border-black border-2 border-separate">Всего пропусков</th>
            <th className="border-black border-2 border-separate">По уважительной причине</th>
            <th className="border-black border-2 border-separate">По неуважительной причине</th>
            {presences.map((_, index) =>
                Array.from({ length: 8 }).map((_, colIdx) => (
                    <th key={`${index}-${colIdx}`} className="border-black border-2 border-separate">
                      {colIdx + 1}
                    </th>
                )),
            )}
          </tr>
          </thead>
          <tbody className="bg-white border-separate border border-black text-center overflow-x-auto">
          {students.map((student, studentIndex) => {
            const studentStat = statistic.find(stat => stat.studentId === student.studentId);
            return (
                <tr key={studentIndex} className="border-separate border border-black text-center">
                  <td className="border-separate bg-white border border-black text-center sticky left-0 z-10">
                    {studentIndex + 1}
                  </td>
                  <td className="border-separate bg-white border border-black text-center sticky left-[15px] z-10">
                    {student.fio}
                  </td>
                  <td className="border-separate bg-white border border-black text-center">
                    {studentStat ? studentStat.missedTotal : "0"}
                  </td>
                  <td className="border-separate bg-white border border-black text-center">
                    {studentStat ? studentStat.missedByGoodReason : "0"}
                  </td>
                  <td className="border-separate bg-white border border-black text-center">
                    {studentStat ? studentStat.missedByBadReason : "0"}
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
                                className="border-separate border border-black text-center"
                            >
                              {attendance.length > 0 ? attendance[0].attendanceType.name : ""}
                            </td>
                        );
                      }),
                  )}
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
  );
};

export { PresenceTable };
