import { Badge } from "@/components/ui/badge";

const RecentExpanses = ({ recentTx, isLoading }) => {
  if (isLoading) return <div className="text-center text-gray-500 py-5 font-medium">Loading, please wait...</div>;

  return (
    <section className="py-5">
      <h2 className="text-2xl font-medium py-4 text-gray-700">Recent Expenses</h2>

      {recentTx.length > 0 ? (
        <div className="space-y-4">
          {recentTx.map((tx) => (
            <div
              key={tx._id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-1">
                <h4 className="font-semibold text-gray-700 text-sm sm:text-base">{tx.title}</h4>
                <p className="text-xs text-gray-400">{tx.date}</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge
                  className={`${
                    tx.category === "Food"
                      ? "bg-red-50 text-red-400"
                      : tx.category === "Transport"
                      ? "bg-blue-50 text-blue-400"
                      : "bg-green-50 text-green-400"
                  } px-2 py-1 text-xs rounded-full`}
                >
                  {tx.category}
                </Badge>
                <Badge
                  className={`${
                    tx.payment === "Cash"
                      ? "bg-yellow-50 text-yellow-600"
                      : tx.payment === "Credit"
                      ? "bg-purple-50 text-purple-400"
                      : "bg-emerald-50 text-emerald-400"
                  } px-2 py-1 text-xs rounded-full`}
                >
                  {tx.payment}
                </Badge>
              </div>

              <div>
                <span className="text-gray-600 font-bold text-base sm:text-lg">₹{tx.amount}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center py-5">No transactions</div>
      )}
    </section>
  );
};

export default RecentExpanses;
