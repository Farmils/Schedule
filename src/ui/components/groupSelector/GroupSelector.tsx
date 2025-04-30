import { FC } from "react";
import { getSchedule } from "../../../core/api/login-api.ts";
import { useGetGlobalContext } from "../../../core/context/Context.tsx";

const GroupSelector: FC = () => {
  const { setSchedule } = useGetGlobalContext();
  const selectGroup = async (event) => {
    event.preventDefault();
    const targetGroup = event.target[0].value;
    const response = await getSchedule(targetGroup);
    console.log(response.data);
    setSchedule(response.data);
  };
  return (
    <form className="max-w-sm mx-auto m-5" onSubmit={selectGroup}>
      <label
        htmlFor="countries"
        className="  text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        id="countries"
        className="bg-gray-400 border border-gray-300 text-black text-sm  block w-full "
        defaultValue={"Выберите группу"}
      >
        <option>Выберите группу</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <button
        type={"submit"}
        className={
          "text-black w-full border border-black rounded-2xl bg-amber-50"
        }
      >
        Показать расписание
      </button>
    </form>
  );
};
export { GroupSelector };
