import ExpanseButton from "@/components/button/Button";
import RecentExpanses from "./RecentExpanses";
import DailyExpanse from "./DailyExpanse";
import TotalExpanses from "./TotalExpanses";
import { useGetExpanseDataQuery } from "@/services/expanseApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const { userName, userId } = useSelector((state) => state.Auth);
  const { data, isLoading } = useGetExpanseDataQuery(userId);
  const recentTx = data?.data || [];
  const filterById = recentTx.filter((ex) => ex.userId === userId);
  return (
    <section className="p-5 mt-10 md:mt-0 space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-5 pb-10">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-700 dark:text-white">
            Welcome Back <span className="text-gray-600 dark:text-gray-300 ms-3">{userName}</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here is your spending overview</p>
        </div>

        <Link to="/addExpanse">
          <ExpanseButton className="bg-gradient-to-r from-[#0dd1b7] to-[#177aec] text-white hover:bg-gradient-to-l hover:from-[#177aec] hover:to-[#0dd1b7]">
            Add New Expanse
          </ExpanseButton>
        </Link>
      </div>

      <TotalExpanses recentTx={filterById} />

      <div className="lg:w-2xl space-y-8">
        <DailyExpanse recentTx={filterById} />
      </div>

      <RecentExpanses recentTx={filterById} isLoading={isLoading} />
    </section>
  );
};

export default DashBoard;
