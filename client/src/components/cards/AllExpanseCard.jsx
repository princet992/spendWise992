import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { SquarePen, Trash } from "lucide-react";
import { useRemoveExpanseDataMutation } from "@/services/expanseApi";

const AllExpanseCard = ({ expanse }) => {
  const [removeExpanse] = useRemoveExpanseDataMutation();
  const handleRemoveExpanse = async (Id) => {
    try {
      if (confirm("Are you sure")) {
        await removeExpanse(Id).unwrap();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Card className="h-full bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col p-4">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-gray-700 text-lg font-semibold flex justify-between">
          {expanse?.title}

          <Trash className="h-5 w-5 hover:text-red-700" onClick={() => handleRemoveExpanse(expanse?._id)} />
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm">{expanse?.date}</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-between items-start gap-4 flex-1 p-0">
        <div className="flex flex-col gap-1">
          <Badge className="bg-blue-50 text-blue-400 px-2 py-1 rounded-full text-xs">{expanse?.category}</Badge>
          <p className="text-gray-500 text-xs">{expanse?.payment}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <h2 className="text-gray-700 font-semibold text-lg">₹{expanse?.amount}</h2>
          {expanse?.isRecurring && (
            <Badge className="bg-teal-50 text-teal-400 px-2 py-1 rounded-full text-xs">Recurring</Badge>
          )}
        </div>
      </CardContent>
      {expanse?.notes && (
        <CardFooter className="p-0 mt-2">
          <p className="text-gray-500 text-sm">{expanse?.notes}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default AllExpanseCard;
