import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { Pie, PieChart } from "recharts";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DailyExpanse = ({ recentTx }) => {
  const weeklyData = recentTx.reduce((acc, exp) => {
    const day = format(parseISO(exp.date), "EEE");
    const found = acc.find((d) => d.day === day);

    if (found) {
      found.amount += exp.amount;
    } else {
      acc.push({ day, amount: exp.amount });
    }
    return acc;
  }, []);

  const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const sortedData = daysOrder.map((day) => weeklyData.find((d) => d.day === day) || { day, amount: 0 });

  const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];
  const categoryData = recentTx.reduce((acc, tx) => {
    const found = acc.find((item) => item.name === tx.category);
    if (found) {
      found.value += tx.amount;
    } else {
      acc.push({ name: tx.category, value: tx.amount });
    }
    return acc;
  }, []);

  const fallbackData = [{ name: "No Data", value: 1 }];
  return (
    <>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Daily Trends</TabsTrigger>
          <TabsTrigger value="password">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="">
            <CardHeader>Daily Spending (Last 7 Days)</CardHeader>
            <CardContent>
              <div className="h-[150px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sortedData}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#4f46e5" barSize={20} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardContent>
              <div className="h-[200px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData.length > 0 ? categoryData : fallbackData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      fill="#8884d8"
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {categoryData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-slate-700">{entry.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DailyExpanse;
