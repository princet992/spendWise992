import CategoryCard from "@/components/cards/CategoryCard";
import { Calendar1, IndianRupee, ReceiptIndianRupee, Sparkle, WalletMinimal } from "lucide-react";

const TotalExpanses = ({ recentTx }) => {
  const currentMonth = new Date().getMonth() + 1;
  const currMonthTx = recentTx.filter((tx) => {
    const txMonth = new Date(tx.date).getMonth() + 1;
    return txMonth === currentMonth;
  });

  const totalSpent = recentTx.reduce((acc, exp) => acc + exp.amount, 0);
  const monthlyExpanse = currMonthTx.reduce((acc, exp) => acc + exp.amount, 0);
  const totalExpanses = recentTx.length;

  const day = new Date().getDate();
  const dailyAverage = (totalSpent / day).toFixed(2);

  const biggestExpanse = recentTx.length > 0 ? recentTx.reduce((max, tx) => (tx.amount > max.amount ? tx : max)) : null;
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
        <CategoryCard title="Total Spent" TitleIcon={ReceiptIndianRupee} Icon={IndianRupee} data={totalSpent} />
        <CategoryCard title="This Month" TitleIcon={Calendar1} Icon={IndianRupee} data={monthlyExpanse} />
        {/* <CategoryCard title="Daily Avg" TitleIcon={WalletMinimal} Icon={IndianRupee} data={dailyAverage} /> */}
        <CategoryCard title="Total Expanses" data={totalExpanses} />
        <CategoryCard title="Top Category" TitleIcon={Sparkle} data={biggestExpanse?.category || "_"} />
        <CategoryCard
          title="Biggest Expense"
          TitleIcon={Sparkle}
          Icon={IndianRupee}
          data={biggestExpanse?.amount || 0}
        />
      </div>
    </>
  );
};
export default TotalExpanses;
