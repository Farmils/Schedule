import {FC, useEffect} from "react";
import {useGetGlobalContext} from "../../../core/context/Context.tsx";
import {getSchedule} from "../../../core/api/login-api.ts";

const ScheduleTable: FC = () => {
  const {setSchedule,schedule} = useGetGlobalContext()

  useEffect(() => {
    (async ()=>{
      const response = await getSchedule()
      console.log(response.data)
      setSchedule(response.data)
    })()
  }, [setSchedule]);
  return(
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-white dark:text-white">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              <p>Понедельник</p>
            </th>
            <th scope="col" className="px-6 py-3">
              <p>Вторник</p>
            </th>
            <th scope="col" className="px-6 py-3">
              <p>Среда</p>
            </th>
            <th scope="col" className="px-6 py-3">
              <p>Четверг</p>
            </th>
            <th scope="col" className="px-6 py-3">
              <p>Пятница</p>
            </th>
            <th scope="col" className="px-6 py-3">
              <p>Суббота</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              1
            </th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              2
            </th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              3
            </th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              4
            </th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              5
            </th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              6
            </th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              7
            </th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              8
            </th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              9
            </th>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              10
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export { ScheduleTable };
