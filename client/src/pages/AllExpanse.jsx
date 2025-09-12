import AllExpanseCard from "@/components/cards/AllExpanseCard";
import { useGetExpanseDataQuery } from "@/services/expanseApi";
import FilterExpanse from "./FilterExpanse";
import { BadgeIndianRupee, MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ExpanseButton from "@/components/button/Button";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const AllExpanse = () => {
  const { userId } = useSelector((state) => state.Auth);
  const { data } = useGetExpanseDataQuery();
  const expenses = data?.data || [];
  const filterById = expenses.filter((ex) => ex.userId === userId);
  const [filter, setFilter] = useState("");

  const filteredExpanses = useMemo(() => {
    return filterById.filter((ex) => {
      const searchText = !filter.text || ex.title.toLowerCase().includes(filter.text.toLowerCase());
      const searchCategory = filter.category === "All Categories" || ex.category === filter.category;
      const searchByPaymentType = filter.payment === "All payments" || ex.payment === filter.payment;

      return searchText && searchCategory && searchByPaymentType;
    });
  }, [filter, filterById]);

  return (
    <section className="p-10  min-h-screen">
      <div className="flex justify-between items-center pb-6 flex-wrap gap-4">
        <div className="flex gap-4 items-center">
          <Link to="/">
            <div className="border h-10 w-10 flex items-center justify-center rounded bg-white shadow-sm hover:shadow-md transition">
              <MoveLeft className="text-gray-600" />
            </div>
          </Link>
          <div>
            <h2 className="flex items-center gap-2 text-3xl font-bold text-gray-700">
              <BadgeIndianRupee className="text-green-500 h-8 w-8" /> All Expenses
            </h2>
            <p className="py-1 text-gray-500 text-sm md:text-base">Track your spending and stay on budget</p>
          </div>
        </div>
        <Link to="/addExpanse">
        <ExpanseButton>Add New Expanse</ExpanseButton>
        </Link>
      </div>

      <FilterExpanse onFilter={setFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
        {filteredExpanses && filteredExpanses.length > 0 ? (
          filteredExpanses?.map((expanse) => (
            <div key={expanse._id} className="h-full">
              <AllExpanseCard expanse={expanse} />
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center col-span-full py-5">No transactions</div>
        )}
      </div>
    </section>
  );
};

export default AllExpanse;
