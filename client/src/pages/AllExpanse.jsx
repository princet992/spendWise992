import AllExpanseCard from "@/components/cards/AllExpanseCard";
import { useGetExpanseDataQuery } from "@/services/expanseApi";
import FilterExpanse from "./FilterExpanse";
import { BadgeIndianRupee, MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ExpanseButton from "@/components/button/Button";

const AllExpanse = () => {
  const { data } = useGetExpanseDataQuery();
  const expenses = data?.data || [];

  return (
    <>
      <section className="p-10 bg-[#eff6ff] min-h-screen">
        <div className="flex justify-between items-center pb-6">
          <div className="flex gap-4 items-center ">
            <Link to="/">
              <div className="border h-10 w-10 flex items-center justify-center p-1 rounded bg-white">
                <MoveLeft />
              </div>
            </Link>
            <div>
              <h2 className="flex items-center gap-2 text-3xl font-bold">
                <BadgeIndianRupee className="text-[#19af25] h-8 w-8 " /> All Expenses
              </h2>
              <p className="py-2">Track your spending and stay on budget</p>
            </div>
          </div>
          <ExpanseButton>Add New Expanse</ExpanseButton>
        </div>
        <FilterExpanse />
        <div className="flex items-center flex-wrap gap-5">
          {expenses?.map((expanse) => (
            <AllExpanseCard key={expanse._id} expanse={expanse} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AllExpanse;
