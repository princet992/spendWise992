import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";

const AllExpanseCard = ({ expanse }) => {
  return (
    <>
      <Card className="min-w-[20rem]">
        <CardHeader>
          <CardTitle>{expanse?.title}</CardTitle>
          <CardDescription>{expanse?.date}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center gap-2">
          <div>
            <Badge variant="#0a93a5">{expanse?.category}</Badge>
            <p className="text-xs py-2">{expanse?.payment}</p>
          </div>
          <div>
            <h2>{expanse?.amount}</h2>
            {expanse?.isRecurring ? (
              <Badge variant="#0a93a5" className="m-0">
                Recurring
              </Badge>
            ) : (
              ""
            )}
          </div>
        </CardContent>
        <CardFooter>{expanse?.notes && <p className="text-sm text-slate-700">{expanse?.notes}</p>}</CardFooter>
      </Card>
    </>
  );
};

export default AllExpanseCard;
