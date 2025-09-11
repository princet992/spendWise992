import { Badge } from "@/components/ui/badge";

const RecentExpanses = ({ recentTx, isLoading }) => {
  if (isLoading) return <div className="text-center text-red-700 py-5">Loading,please wait...</div>;
  return (
    <>
      <section className="py-5">
        <h2 className="text-2xl font-medium py-4">Recent Expanses</h2>
        {recentTx.length > 0 ? (
          <div className="space-y-4">
            {recentTx.map((tx) => (
              <div
                key={tx._id}
                className="flex flex-col sm:gap-4 gap-2 sm:flex-row justify-between items-start sm:items-center bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition"
              >
                <div className="flex flex-col sm:flex-1 mb-2 sm:mb-0">
                  <h4 className="font-semibold text-slate-800 text-sm sm:text-base">{tx.title}</h4>
                  <p className="text-xs text-slate-500">{tx.date}</p>
                </div>

                <div className="flex gap-4 mb-2 sm:mb-0 flex-wrap">
                  <Badge
                    className={`${
                      tx.category === "Food"
                        ? "bg-red-100 text-red-700"
                        : tx.category === "Transport"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    {tx.category}
                  </Badge>
                  <Badge
                    className={`${
                      tx.payment === "Cash"
                        ? "bg-yellow-100 text-yellow-700"
                        : tx.payment === "Credit"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {tx.payment}
                  </Badge>
                </div>

                <div>
                  <span className="text-base sm:text-lg font-bold text-slate-900">₹{tx.amount}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No transactions </div>
        )}
      </section>
    </>
  );
};

export default RecentExpanses;
