import ExpanseButton from "@/components/button/Button";
import RecentExpanses from "./RecentExpanses";
import DailyExpanse from "./DailyExpanse";
import { useGetExpanseDataQuery } from "@/services/expanseApi";
import TotalExpanses from "./TotalExpanses";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const { data, isLoading } = useGetExpanseDataQuery();
  const recentTx = data?.data || [];
  return (
    <>
      <section className="p-5 mt-5 md:mt-0">
        <div className="flex justify-between items-center flex-wrap gap-5 pb-10">
          <div>
            <h2 className="text-3xl font-bold">Welcome Back </h2>
            <p>Here is your spending overview</p>
          </div>
          <Link to="/addExpanse">
            {" "}
            <ExpanseButton>Add New Expanse</ExpanseButton>
          </Link>
        </div>
        <div className="grid  lg:grid-cols-3 gap-5">
          <div className="col-span-2">
            <DailyExpanse recentTx={recentTx} />
          </div>
          <TotalExpanses recentTx={recentTx} />
        </div>

        <RecentExpanses recentTx={recentTx} isLoading={isLoading} />
      </section>
    </>
  );
};

export default DashBoard;
