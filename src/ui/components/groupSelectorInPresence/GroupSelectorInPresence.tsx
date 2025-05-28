import { ChangeEvent, FC, useCallback, useState } from "react";
import { useGetGlobalContext } from "../../../core/context/Context.tsx";
import { PresenceTable } from "../presenceTable/PresenceTable.tsx";

const GroupSelectorInPresence: FC = () => {
  const [groupId, setGroupId] = useState<number | undefined>();
  const { fetchStudents, setNum, fetchPresence,fetchStatistic } = useGetGlobalContext();

  const groupSelectHandler = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = +e.target.value;
      setGroupId(selectedValue);
      await fetchStudents(+e.target.value);
      await fetchPresence(+e.target.value);
      await fetchStatistic(+e.target.value);
      setNum(selectedValue);
    },
    [fetchStudents],
  );



  return (
    <div>
      <div className="max-w-sm mx-auto m-5">
        <label
          htmlFor="countries"
          className="text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <select
          id="countries"
          className="bg-gray-400 border border-gray-300 text-black text-sm block w-full"
          defaultValue={"Выберите группу"}
          onChange={groupSelectHandler}
          value={groupId}
        >
          <option>Выберите группу</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </div>
      <PresenceTable />
    </div>
  );
};

export { GroupSelectorInPresence };
